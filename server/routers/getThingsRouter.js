var express = require('express');
var router = express.Router();
//bring in mongoose
var mongoose = require('mongoose');
//bring in Schema
var shelfModel = require('../models/shelfModel');


////////////////////////////// get all thigns////////////
// show all things

router.get('/getThings', function(req, res){
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

router.post('/getThings', function(req,res){
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

router.delete('/getThings', function(req, res){
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

module.exports = router;
