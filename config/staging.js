// Prod Keys
module.exports = {
	ENVIROMENT: "This is Staging",
	MERCURY_KEY: process.env.MERCURY_KEY,
	FIREBASE: {
		"type": process.env.FIREBASE_TYPE,
		"project_id": process.env.FIREBASE_PROJECT_ID,
		"private_key_id": process.env.FIREBASE_PROJECT_KEY_ID,
		"private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		"client_email": process.env.FIREBASE_CLIENT_EMAIL,
		"client_id": process.env.FIREBASE_CLIENT_ID,
		"auth_uri": process.env.FIREBASE_AUTH_URI,
		"token_uri": process.env.FIREBASE_TOKEN_URI,
		"auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		"client_x509_cert_url": process.env.FIREBASE_AUTH_X509_CERT_URL
	},
	AWS: {
		"accessKeyId": process.env.AWS_ACCESS_KEY_ID,
		"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
	}
}