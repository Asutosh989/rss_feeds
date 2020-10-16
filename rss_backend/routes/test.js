// testin rss-parser library
const Parser = require('rss-parser');

let parser = new Parser();

(async () => {

    let feed = await parser.parseURL('http://feeds.thestreet.com/tsc/feeds/rss/mutual-funds');
    console.log(feed.title);

    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
        console.log('\n\n\n')
    });

})();

// const https = require('https')
// const options = {
//     hostname: 'https://cloud.feedly.com/v3/search/contents?query=corona&count=5&locale=en',
//     //   path: '/todos',
//     method: 'GET',
//     headers: {
//         Authorization: `Bearer soemtoken`,
//     }
// }

// const req = https.request(options, res => {
//     console.log(`statusCode: ${res.statusCode}`)

//     console.log(res)
// })

// req.on('error', error => {
//     console.error(error)
// })

// req.end()