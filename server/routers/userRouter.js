var express = require('express');
var router = express.Router();
//bring in mongoose
var mongoose = require('mongoose');
//bring in Schema
var User = require('../models/userModel');


////////////////////////////// get all thigns////////////
// show all things

router.get('/user', function(req, res){
  console.log('in user get');
  User.find({}, function(err, thingsResults){
    if(err){
      console.log('error occured:', err);
      res.sendStatus(500);
    }else{
      console.log('thingsResults:', thingsResults);
      res.send(thingsResults);
    }
  });
});

router.post('/user', function(req,res){
  console.log('in user post');
  var newUser = new User({
    userName: req.body.userName,
    userId: req.body.userId
  });

  newUser.save(function(err){
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

router.delete('/user', function(req, res){
  console.log('in user delete');
  User.findByIdAndRemove(req.query.id, function(err, result){
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
