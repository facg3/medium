const fs = require('fs');
const path = require('path');
const request = require('request');

const router = (req, res) => {
  console.log(req.url);
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
  // request.myRequest()
  let body = [];
  req.on('data', function(chunkOfData) {
    body.push(chunkOfData.toString());
  }).on('error', function() {
    res.writeHead(404, 'content-Type: text/html');
    res.end('<h1>Error 404: Page Not Found</h1>')
  }).on('end', function() {
    // req data from news api
    request(url, (err, res) => {

    })

    console.log('end', body);
  });
}

module.exports = router;



// const handlePublicFiles = (request, res) => {
//   const extension = url.split('.')[1];
//   const fileType = {
//     html: 'text/html',
//     css: 'text/css',
//     js: 'application/javascript',
//     ico: 'image/x-icon'
//   };
//   fs.readFile(path.join(__dirname, '..', 'back', url), (error, file) => {
//     if (error) {
//       res.writeHead(500, 'content-Type:text/html');
//       res.end('<h1> Internal server Error </h1>');
//     } else {
//       res.writeHead(200, 'content-Type:' + fileType[extension]);
//       res.end(file);
//     }
//   });
// };

// if (url === '/mynews') {
//   request.on('data', function(chunkOfData) {
//     var textChunk = chunkOfData.toString('utf8');
//     input += textChunk;
//   });
//
//   request.on('end', function() {
//     fs.readFile(path.join(__dirname, 'data', 'data.json'), (error, file) => {
//       if (error) {
//         res.writeHead(500, 'content-Type: text/html');
//         res.end('<h1>internal server Error</h1>');
//       }
//       const elements = JSON.parse(file).elements;
//       var ret = [];
//       let limit = 0;
//       // elements.forEach(function(elements[i]) {
//       //
//       // });
//       for (var i = 0; i < elements.length; i++) {
//         elements[i].name = elements[i].name.toLowerCase();
//         if (elements[i].name.includes(input.toLowerCase())) {
//           ret.push(elements[i]);
//           limit++;
//           console.log(limit, '.', elements[i].name);
//         }
//         if (limit == 7) break;
//       }
//       res.writeHead(200, 'content-Type: text/html');
//       res.end(JSON.stringify(ret));
//
//     });
//   });
