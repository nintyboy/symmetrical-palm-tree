/*-------------------
REQUIRES
-------------------*/

const admin = require('firebase-admin');
const Storage = require('@google-cloud/storage');

/*-------------------
GLOBALS
-------------------*/

const serviceAccount = require('../config/keys.js');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount.FIREBASE),
	storageBucket: 'gs://staging.longform-dev.appspot.com'
});

const db = admin.firestore();
const storage = new Storage({
	projectId: 'longform-dev'
})
const bucketName = 'gs://staging.longform-dev.appspot.com'

const bucket = admin.storage().bucket();



/*-------------------
Exports
-------------------*/

module.exports = {
	checkIfData: async (req) => {
			console.time('checkIfData');
			const collection = await db.collection('URLS')
				.where('data.url', '==', req.body.data.url)
				.get()
				.then(async (doc) => {
					let data;
					// console.log('Document Output:')
					// console.log(doc);
					if (doc.size > 0) {
						// return doc.documentSnapshot;
						doc.forEach(documentSnapshot => {
							data = documentSnapshot.data();

						});
					}
					console.timeEnd('checkIfData');
					return data;
				})

			return collection;
		},
		upload: async (data, getArticle) => {
				console.time('upload');
				const signedURL = storage.bucket(bucketName)
					.upload(data, {
						destination: getArticle.domain + "/" + getArticle.title.replace(/\s+/g, '-') + '.mp3'
					})
					.then(() => {
						let file = bucket.file(getArticle.domain + "/" + getArticle.title.replace(/\s+/g, '-') + '.mp3');
						return file.getSignedUrl({
							action: 'read',
							expires: '03-09-2500'
						});
					}).then(url => {
						console.log("URL :", url);
						console.timeEnd('upload');
						return url[0];
					}).catch(err => {
						console.log('ERROR (Firebase Storage): ', err);
					});

				return signedURL;
			},
			putData: async (data) => {
				console.time('putData');
				let collection = db.collection('URLS');
				let addDocs = await collection.add({
					data
				}).then(ref => {
					console.log("Added to DB, Ref ID: ", ref.id);
					console.timeEnd('putData');
				}).catch(err => {
					console.log('ERROR (Firebase Firestore): ', err);
				})

			}
}