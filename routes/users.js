var express = require('express');
var feedparser = require('ortoo-feedparser');
const Feed = require('../models/feed');
const tags = require('striptags');
const url = 'http://theindiansociety.org/feed';

var router = express.Router();
/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == 'Admin' && password == 'admin') {
    res.redirect('/users/login/feeds');
  } else {
    req.flash('error_msg', {
      'error': 'Try Again'
    });
    res.locals.messages = req.flash();
    res.redirect('/');
  }
});

// function getFeeds(MyFeed){
//   return new Promise((resolve, reject) => {
//     const feeds = MyFeed.find();
//     resolve(feeds);
//   });
// }

function getDirectFeeds(){
  return new Promise((resolve, reject) => {
    var feedDto= [];
    feedparser.parseUrl(url)
      .on('error', (error) => {
        reject(error);
      })
      .on('article', (article) => {
        const feed = new Feed({
          title: article.title,
          summary: tags(article.summary || article.description),
          author: article.author,
          publishedDate: new Date(article.pubDate),
          image: (article.image ? article.image.url : '')
                  || (article.meta.image ? article.meta.image.url : '')
        });
        feedDto.push(feed);
      });
    setTimeout(resolve, 5000, feedDto);
  });
}

router.get('/login/feeds', function(req, res, next) {
  try {
    getDirectFeeds().then(allFeeds=>{
      res.render('dashboard', {
        docs: allFeeds
      });
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
