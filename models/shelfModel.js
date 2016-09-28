var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// building object literal for adding "things" to db
var thingsSchema = new Schema({
  object_name: String,
  description: String,
  owner: String,
  img_url: String
});

var shelfModel = mongoose.model('things', thingsSchema);
module.exports = shelfModel;

// done with DB stuff
