const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
const app = express();



app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function(req,res){
  res.send('Hello World! ' + keys.ENVIROMENT);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Example app listening on port'+PORT));
