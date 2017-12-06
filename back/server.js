const http = require('http');
const router = require('./router');
const server = http.createServer(router);
const port = process.env.port || 4000;

server.listen(port, result =>{
  console.log(`Server running successfully on port: ${port}`);
});
