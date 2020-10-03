const mongoose = require('mongoose');

var Schema = new mongoose.schema();
var userData = new Schema({
  rssfeed : String,
  time : Date
});

var UserData = mongoose.model('Data', userData);
module.exports = UserData;
