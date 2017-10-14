const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rssfeeds',{
  useMongoClient: true
}).then(() => console.log('Connected'))
  .catch((err) => console.error(err));
