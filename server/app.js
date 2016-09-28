var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser =  bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
app.use(bodyParser.json);

// require shelfModelfor mongodb
var shelfModel = require('../models/shelfModel.js')

// connect to the db with db name = shelf
mongoose.connect('mongodb://localhost:27017/shelf');

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

app.use(express.static('public'));
