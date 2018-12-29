/*
  Longform API
  v1.0
*/

const express = require('express');
const app = express.Router();
const keys = require('../../config/keys');
const firebase = require('../../services/firebase');
const tts = require('../../services/tts');
const parse = require('../../services/parse');


app.post('/url', async (req, res) => {
	if (!req.body) {
		res.send('No Request');
	} else {
		const answer = await firebase.checkIfData(req);
		if (typeof answer === 'object') {
			res.send(answer)
			return;
		} else {
			console.log('Nothing found, parsing article...');
			let getArticle = await parse.getData(req.body.data.url);
			/*
			  TEMP FIX:
			  If the more than 5000 characters then don't make the mp3
			*/
			console.log("Character Count: " + getArticle.char_count);
			if (getArticle.char_count < 5000) {
				const makeMP3 = await tts.makeMP3(getArticle);
				// const upload = await firebase.upload(makeMP3, getArticle);
				// getArticle.URI = upload;
				const sendData = await firebase.putData(getArticle);
			}
			// const makeMP3 = await tts.makeMP3(getArticle);
			// const upload = await firebase.upload(makeMP3, getArticle);
			// getArticle.URI = upload;
			// const sendData = await firebase.putData(getArticle);
			res.send(getArticle);
		}
	}
})


module.exports = app;