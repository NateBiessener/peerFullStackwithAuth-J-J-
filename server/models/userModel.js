var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// building object literal for adding "things" to db
var userSchema = new Schema({
  userName: String,
  userId: String
});

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;

// done with DB stuff
