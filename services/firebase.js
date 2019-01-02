/*-------------------
REQUIRES
-------------------*/

const admin = require('firebase-admin');
const Storage = require('@google-cloud/storage');
const AWS = require('aws-sdk');
const fs = require('fs');

/*-------------------
GLOBALS
-------------------*/

const serviceAccount = require('../config/keys.js');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount.FIREBASE),

});

const db = admin.firestore();

//AWS Config

AWS.config.update(serviceAccount.AWS);

const s3 = new AWS.S3();


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
					let article;
					let id;

					if (doc.size > 0) {
						doc.forEach(documentSnapshot => {
							article = documentSnapshot.data();
							// id = documentSnapshot.id;

						});
					}
					console.timeEnd('checkIfData');
					return article;
					// return {
					// 	article,
					// 	id
					// };
				})

			return collection;
		},
		updateDoc: async (id, field, data) => {
				db.collection("URLS").doc(id).update({
					data: {
						todayVists: 4440
					}
				});
				// const collection = await db.collectiion('URLS')
				// 	.where('uid', '==', id)
				// 	.get()
				// 	.then(function(querySnapshot) {
				//     querySnapshot.forEach(function(doc) {
				//     console.log(doc.id, " => ", doc.data());
				//     // Build doc ref from doc.id
				//     db.collection("users").doc(doc.id).update({foo: "bar"});
				// });
			},

			// Old Firebase Storage Upload
			// upload: async (data, getArticle) => {
			// 		console.time('upload');
			// 		const signedURL = storage.bucket(bucketName)
			// 			.upload(data, {
			// 				destination: getArticle.domain + "/" + getArticle.title.replace(/\s+/g, '-') + '.mp3'
			// 			})
			// 			.then(() => {
			// 				let file = bucket.file(getArticle.domain + "/" + getArticle.title.replace(/\s+/g, '-') + '.mp3');
			// 				return file.getSignedUrl({
			// 					action: 'read',
			// 					expires: '03-09-2500'
			// 				});
			// 			}).then(url => {
			// 				console.log("URL :", url);
			// 				console.timeEnd('upload');
			// 				return url[0];
			// 			}).catch(err => {
			// 				console.log('ERROR (Firebase Storage): ', err);
			// 			});
			//
			// 		return signedURL;
			// 	},
			uploadS3: async function(data, getArticle) {
					console.time('S3 Upload');
					var params = {
						Bucket: 'longform-dev',
						Body: fs.createReadStream(data),
						Key: getArticle.domain + "/" + getArticle.title.replace(/\s+/g, '-') + '.mp3'

					}
					var promise = new Promise((resolve, reject) => {
						s3.upload(params, (err, data) => {
							if (err) {
								console.log('ERROR (S3 Storage): ', err);
							}
							if (data) {
								console.log('Upload Successful: ', data.Location);
								console.timeEnd('S3 Upload');
								resolve(data.Location);
							}
						})
					})

					return promise;

				},
				putData: async (data) => {
					console.time('putData');
					let collection = db.collection('URLS');
					let addDocs = await collection.add({
						data
					}).then(ref => {
						// console.log("Added Data: ", ref);
						console.log("Added to DB, Ref ID: ", ref.id);
						console.timeEnd('putData');
					}).catch(err => {
						console.log('ERROR (Firebase Firestore): ', err);
					})

				}
}