const fs = require('fs');
const path = require('path');
const request = require('request');

const router = (req, res) => {
  const url = req.url;


  if (url === '/') {
    fs.readFile(path.join(__dirname, '..', 'front', 'index.html'), (error, file) => {
      if (error) {
        res.writeHead(500, 'content-Type: text/html');
        res.end('<h1>internal server Error</h1>');
      } else {
        res.writeHead(200, 'content-Type: text/html');
        res.end(file);
      }
    });
  } else if (url === '/mynews') {
    myNewsHandler(req, res);
  } else if (url.startsWith('/front')) {
    const extention = url.split('.')[1];
    const fileType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ico: 'image/x-icon'
    }
    fs.readFile(path.join(__dirname, '..', url), (error, file) => {
      if (error) {
        res.writeHead(500, 'content-Type: text/html');
        res.end('<h1>internal server Error</h1>');
      } else {
        res.writeHead(200, 'content-Type: ' + fileType[extention]);
        res.end(file);
      }
    });
  }
}

function myNewsHandler(req, res) {
  var input;
  req.on('data', function(chunkOfData) {
    input = chunkOfData.toString();
    input = input.split(' ').join('+');
  }).on('error', function() {
    res.writeHead(404, 'content-Type: text/html');
    res.end('<h1>Error 404: Page Not Found</h1>')
  }).on('end', function() {
    var date = new Date();
    date = date.toISOString().substring(0,10);
    // console.log('date: ',date.toISOString().substring(0,10));
    // date = date.toString().substring(0,10);
    // console.log('date modified:', date);
    const link = `https://newsapi.org/v2/everything?apiKey=5613a9a7ed2d47edafd0c5d7350c2d28&q=${input}&from=2017-01-01`;
    request(link, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        var frontData = JSON.parse(response.body);
        // console.log(response.body);
        res.end(JSON.stringify(frontData.articles.slice(0,10)));
        console.log('Recieved data successfully from API!!!');
      }
    })
  });
}

module.exports = router;

