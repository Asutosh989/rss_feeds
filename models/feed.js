const mongoose = require('mongoose');

var feed = new mongoose.Schema ({
  title: String,
  summary: String,
  author: String,
  publishedDate: Date,
  image: String
});

var FeedData = mongoose.model('FeedData', feed);
module.exports = FeedData;
