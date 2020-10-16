const express = require('express');
const Parser = require('rss-parser');
const Feed = require('../models/feed');
const tags = require('striptags');
const utils = require('../utils/feedDetails');

let router = express.Router();
/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username == 'Admin' && password == 'admin') {
    res.status(200).send('Login successful')
  }
  res.status(404).send('Wrong credentials');
});

function getDirectFeeds(feedurl) {

  console.log(feedurl)
  let parser = new Parser();

  return new Promise((resolve, reject) => {
    parser.parseURL(feedurl).then(
      (res) => {
        resolve(res)
      }
    ).catch((error) => {
      console.log(error)
      reject(error)
    })
  })

  // return new Promise((resolve, reject) => {
  //   parser.parseURL(feedurl)
  //     .on('error', (error) => {
  //       reject(error);
  //     })
  //     .on('article', (article) => {
  //       console.log("Article", article)
  //       // const feed = new Feed(
  //       //   title: article.title,
  //       //   summary: tags(article.summary || article.description),
  //       //   author: article.author,
  //       //   publishedDate: new Date(article.pubDate),
  //       //   image: (article.image ? article.image.url : '')
  //       //           || (article.meta.image ? article.meta.image.url : '')
  //       // });
  //       feedDto.push(feed);
  //     });
  //   setTimeout(resolve, 5000, feedDto);
  // });
}

router.get('/populate', (req, res, next) => {
  res.status(200).send(utils.feedDetails);
})

router.get('/feeds', (req, res, next) => {
  if (!req.query.siteoption) {
    res.status(400).send('Bad request!')
  }
  const siteName = req.query.siteoption;
  console.log(siteName);

  const siteBeToSearched = utils.feedDetails.filter((v) => v.name === siteName);
  console.log(siteBeToSearched)

  if (!siteBeToSearched.length) {
    res.status(404).send('Couldn\'t get requested data!')
  }

  if (siteBeToSearched.length) {
    getDirectFeeds(siteBeToSearched[0].defaultURL).then(allFeeds => {
      res.status(200).send(allFeeds.items)
    }).catch((error) => {
      res.status(400).send('Bad request!')
    });
  }
});

router.get('/feedsByUrl', (req, res, next) => {
  if (!req.query.siteoption) {
    res.status(400).send('Bad request!')
  }
  const siteName = req.query.siteoption;
  console.log(siteName);

  const siteBeToSearched = utils.feedDetails.filter((v) => v.name === siteName);
  console.log(siteBeToSearched)

  if (!siteBeToSearched.length) {
    res.status(404).send('Couldn\'t get requested data!')
  }

  if (siteBeToSearched.length) {
    getDirectFeeds(siteBeToSearched[0].defaultURL).then(allFeeds => {
      res.status(200).send(allFeeds.items)
    }).catch((error) => {
      res.status(400).send('Bad request!')
    });
  }
});


module.exports = router;
