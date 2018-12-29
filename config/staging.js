// Staging Keys
module.exports = {
	ENVIROMENT: "This is Staging",
	MERCURY_KEY: process.env.MERCURY_KEY,
	FIREBASE: {
		"type": process.env.FIREBASE.TYPE,
		"project_id": process.env.FIREBASE.PROJECT_ID,
		"private_key_id": process.env.FIREBASE.PROJECT_KEY_ID,
		"private_key": process.env.FIREBASE.PRIVATE_KEY,
		"client_email": process.env.FIREBASE.CLIENT_EMAIL,
		"client_id": process.env.FIREBASE.CLIENT_ID,
		"auth_uri": process.env.FIREBASE.AUTH_URI,
		"token_uri": process.env.FIREBASE.TOKEN_URI,
		"auth_provider_x509_cert_url": process.env.FIREBASE.AUTH_PROVIDER_X509_CERT_URL,
		"client_x509_cert_url": process.env.FIREBASE.AUTH_X509_CERT_URL
	},
	GOOGLE_CLOUD_SPEECH: {
		"type": process.env.GOOGLE_CLOUD_SPEECH.TYPE,
		"project_id": process.env.GOOGLE_CLOUD_SPEECH.PROJECT_ID,
		"private_key_id": process.env.GOOGLE_CLOUD_SPEECH.PROJECT_KEY_ID,
		"private_key": process.env.GOOGLE_CLOUD_SPEECH.PRIVATE_KEY,
		"client_email": process.env.GOOGLE_CLOUD_SPEECH.CLIENT_EMAIL,
		"client_id": process.env.GOOGLE_CLOUD_SPEECH.CLIENT_ID,
		"auth_uri": process.env.GOOGLE_CLOUD_SPEECH.AUTH_URI,
		"token_uri": process.env.GOOGLE_CLOUD_SPEECH.TOKEN_URI,
		"auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_SPEECH.AUTH_PROVIDER_X509_CERT_URL,
		"client_x509_cert_url": process.env.GOOGLE_CLOUD_SPEECH.AUTH_X509_CERT_URL
	},
	GOOGLE_CLOUD_STORAGE: {
		"type": process.env.GOOGLE_CLOUD_STORAGE.TYPE,
		"project_id": process.env.GOOGLE_CLOUD_STORAGE.PROJECT_ID,
		"private_key_id": process.env.GOOGLE_CLOUD_STORAGE.PROJECT_KEY_ID,
		"private_key": process.env.GOOGLE_CLOUD_STORAGE.PRIVATE_KEY,
		"client_email": process.env.GOOGLE_CLOUD_STORAGE.CLIENT_EMAIL,
		"client_id": process.env.GOOGLE_CLOUD_STORAGE.CLIENT_ID,
		"auth_uri": process.env.GOOGLE_CLOUD_STORAGE.AUTH_URI,
		"token_uri": process.env.GOOGLE_CLOUD_STORAGE.TOKEN_URI,
		"auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_STORAGE.AUTH_PROVIDER_X509_CERT_URL,
		"client_x509_cert_url": process.env.GOOGLE_CLOUD_STORAGE.AUTH_X509_CERT_URL
	}
}