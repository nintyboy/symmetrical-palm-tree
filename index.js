/*----------
MODULES
------------*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
const app = express();

const api = require('./routes/api/v1');



const getIP = (req) => {
	const ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : null);
	return ip;
}


/*----------
INITIALISE APP
------------*/

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

/*----------
Setup Routes
------------*/

app.get('/', function(req, res) {
	res.send('Hello World! ' + keys.ENVIROMENT);
});

app.use('/api', api);

app.use(function(req, res, next) {
	// If no api send a 404
	res.status(404);

	// respond with html page
	// if (req.accepts('html')) {
	//   once we have a template renderer
	//   res.render('404', { url: req.url });
	//   return;
	// }

	// respond with json
	// if (req.accepts('json')) {
	//   res.send({ error: 'Not found' });
	//   return;
	// }

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Server running on port: ' + PORT);