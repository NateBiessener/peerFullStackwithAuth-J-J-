var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser =  bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 8080;

// spin up server
app.listen(port, function(){
  console.log('listening on port:', port);
});

var mongoose = require('mongoose');
app.use(bodyParser.json());

// require shelfModelfor mongodb
var shelfModel = require('./models/shelfModel.js');

// connect to the db with db name = shelf
mongoose.connect('mongodb://localhost:27017/shelf');



app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

////////////////////////////// get all thigns////////////
// show all things
app.get('/getThings', function(req, res){
  console.log('in getThings get');
  shelfModel.find({}, function(err, thingsResults){
    if(err){
      console.log('error occured:', err);
      res.sendStatus(500);
    }else{
      console.log('thingsResults:', thingsResults);
      res.send(thingsResults);
    }
  });
});

app.post('/getThings', function(req,res){
  console.log('in getThings post');
  var newItem = new shelfModel({
    description: req.body.description,
    owner: req.body.owner,
    img_url: req.body.img_url
  });

  newItem.save(function(err){
    if (err) {
      console.log('save error:', err);
      res.sendStatus(500);
    }
    else {
      console.log('saved');
      res.sendStatus(201);
    }
  })
});

app.delete('/getThings', function(req, res){
  console.log('in getThings delete');
  shelfModel.findByIdAndRemove(req.query.id, function(err, result){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      console.log('item deleted');
      res.send(result);
    }
  });
});


// app.get('/test', function(req, res) {
//   console.log('in test');
//
//   var justin = new shelfModel({
//     description: 'handheld sega',
//     owner: 'Justin',
//     img_url: 'http://retrothing.typepad.com/photos/uncategorized/seganomad.jpg'
//     });
//
//     justin.save(function(err) {
//       if(err){
//         console.log(err);
//         res.sendStatus(500); // nope!
//       }else{
//         console.log('justin saved!');
//         res.sendStatus(201); // 201 - created
//       }
//     });
// });







app.use(express.static('public'));
