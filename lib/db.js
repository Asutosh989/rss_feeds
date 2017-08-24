const mongoose = require('mongoose');

mongoose.connect('mongodb://feeds:pass@ds151433.mlab.com:51433/rssfeeds',{
  useMongoClient: true
}).then(() => console.log('Connected'))
  .catch((err) => console.error(err));
