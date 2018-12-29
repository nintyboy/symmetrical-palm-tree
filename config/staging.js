// Prod Keys
module.exports = {
	ENVIROMENT: "This is production",
	MERCURY_KEY: process.env.MERCURY_KEY,
	FIREBASE: {
		"type": process.env.FIREBASE.type,
		"project_id": process.env.FIREBASE.project_id,
		"private_key_id": process.env.FIREBASE.project_key_id,
		"private_key": process.env.FIREBASE.private_key,
		"client_email": process.env.FIREBASE.client_email,
		"client_id": process.env.FIREBASE.client_id,
		"auth_uri": process.env.FIREBASE.auth_uri,
		"token_uri": process.env.FIREBASE.token_uri,
		"auth_provider_x509_cert_url": process.env.FIREBASE.auth_provider_x509_cert_url,
		"client_x509_cert_url": process.env.FIREBASE.auth_x509_cert_url
	},
	GOOGLE_CLOUD_SPEECH: {
		"type": process.env.GOOGLE_CLOUD_SPEECH.type,
		"project_id": process.env.GOOGLE_CLOUD_SPEECH.project_id,
		"private_key_id": process.env.GOOGLE_CLOUD_SPEECH.project_key_id,
		"private_key": process.env.GOOGLE_CLOUD_SPEECH.private_key,
		"client_email": process.env.GOOGLE_CLOUD_SPEECH.client_email,
		"client_id": process.env.GOOGLE_CLOUD_SPEECH.client_id,
		"auth_uri": process.env.GOOGLE_CLOUD_SPEECH.auth_uri,
		"token_uri": process.env.GOOGLE_CLOUD_SPEECH.token_uri,
		"auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_SPEECH.auth_provider_x509_cert_url,
		"client_x509_cert_url": process.env.GOOGLE_CLOUD_SPEECH.auth_x509_cert_url
	},
	GOOGLE_CLOUD_STORAGE: {
		"type": process.env.GOOGLE_CLOUD_STORAGE.type,
		"project_id": process.env.GOOGLE_CLOUD_STORAGE.project_id,
		"private_key_id": process.env.GOOGLE_CLOUD_STORAGE.project_key_id,
		"private_key": process.env.GOOGLE_CLOUD_STORAGE.private_key,
		"client_email": process.env.GOOGLE_CLOUD_STORAGE.client_email,
		"client_id": process.env.GOOGLE_CLOUD_STORAGE.client_id,
		"auth_uri": process.env.GOOGLE_CLOUD_STORAGE.auth_uri,
		"token_uri": process.env.GOOGLE_CLOUD_STORAGE.token_uri,
		"auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_STORAGE.auth_provider_x509_cert_url,
		"client_x509_cert_url": process.env.GOOGLE_CLOUD_STORAGE.auth_x509_cert_url
	}
}