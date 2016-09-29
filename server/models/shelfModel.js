var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// building object literal for adding "things" to db
var thingsSchema = new Schema({
  description: {type: String, required: true},
  owner: {type: String, required: true},
  img_url: {type: String, required: false},
  datePlaced: {type: Date, default: Date.now}
});

var shelfModel = mongoose.model('things', thingsSchema);
module.exports = shelfModel;

// done with DB stuff
