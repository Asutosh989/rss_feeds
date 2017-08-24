const feedparser = require('ortoo-feedparser');
const Feed = require('../models/feed');
const tags = require('striptags');
require('../lib/db');
const url = "http://theindiansociety.org/feed";

const tasks = [];
feedparser.parseUrl(url).on('article', (article) => {
  console.log('Acquired', article.title);
  const feed = new Feed({
    title: article.title,
    summary: tags(article.summary || article.description),
    author: article.author,
    publishedDate: new Date(article.pubDate || article.pubdate),
    image: (article.image ? article.image.url : '')
            || (article.meta.image ? article.meta.image.url : '')
  }).save((err, f) => {
    if (err) {
      console.error(err);
    }
    console.log('Saved', f.title);
  });

  //tasks.push(feed.save());
}).on('error', (err) => console.error(err));

// Promise.all(tasks).then(() => {
//   console.log('Saved');
// }).catch((err) => {
//   console.error(err);
// })
