const http = require('http');
const myRequest = (url, cb) => {
  /*
  create your own request module here.
  It should take a url to make a http GET request, and a callback function with three arguments;
  1. error (String: if an error occurred),
  2. response(Object; includes the response & statusCode of the request),
  3. body (String; includes the body of the request)
  */
  http.get(url, (res) => {
    const statusCode = res.statusCode;
    let contentType = res.headers['content-type'];
    let error;
    if (statusCode !== 200) {
      error = new Error(`Request failed. Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Content type error. Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      cb(null, res, parsedData);
    });
  })
}

module.exports = myRequest;
