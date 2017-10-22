var express = require('express');
var feedparser = require('ortoo-feedparser');
const Feed = require('../models/feed');
const tags = require('striptags');

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

function getDirectFeeds(feedurl){
  return new Promise((resolve, reject) => {
    var feedDto= [];
    feedparser.parseUrl(feedurl)
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
    var siteName=req.query.siteoption || 'The Indian Society';
    switch(siteName){
    case 'BBC News':{

      const defaultUrl='http://feeds.bbci.co.uk/news/world/rss.xml';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'CNN News':{

      const defaultUrl='http://rss.cnn.com/rss/edition_world.rss';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'Yahoo':{

      const defaultUrl='https://www.yahoo.com/news/rss/';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'NASA':{

      const defaultUrl='https://www.nasa.gov/rss/dyn/image_of_the_day.rss';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'PC World':{

      const defaultUrl='https://www.pcworld.com/index.rss';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'DNA India':{

      const defaultUrl='http://www.dnaindia.com/syndication/rss,catID-2.xml';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'Times of India':{

      const defaultUrl='http://newsrack.in/crawled.feeds/toi.rss.xml';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'The Financial Times':{

      const defaultUrl='https://www.ft.com/world/asia-pacific/india?format=rss';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'India Today':{

      const defaultUrl='http://indiatoday.intoday.in/rss/article.jsp?sid=61';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    case 'Business-Standard':{

      const defaultUrl='http://www.business-standard.com/rss/companies-101.rss';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
      break;
    }
    default:{
      const defaultUrl='http://theindiansociety.org/feed';
      getDirectFeeds(defaultUrl).then(allFeeds=>{
        res.render('dashboard', {
          docs: allFeeds,
          siteName: siteName
        });
      });
    }
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
