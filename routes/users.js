var express = require('express');
var feedparser = require('ortoo-feedparser');
const Feed = require('../models/feed');


var router = express.Router();
/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == "Admin" && password == "1234") {
    res.redirect('/users/login/feeds');
  } else {
    req.flash('error_msg', {
      "error": "Try Again"
    });
    res.locals.messages = req.flash();
    res.redirect('/');
  }
});

router.get('/login/feeds', async function(req, res, next) {
  try {
    const feeds = await Feed.find().sort({
      publishedDate: -1
    });
    res.render('dashboard', {
      docs: feeds
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
