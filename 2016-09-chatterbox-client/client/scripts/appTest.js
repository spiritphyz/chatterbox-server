var http = require('http');
var fs = require('fs');

var ip = '127.0.0.1';
var port = '3024';
var defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'Content-Type': 'text/html',
  'access-control-max-age': 10 // in seconds
};

var server = http.createServer(function(request, response) {
  fs.readFile('../index.html', function(err, data) {
    if (err) { console.log(err); }
    response.writeHead(201, defaultHeaders);
    response.write(data);
    response.end();
  });
}).listen(port, ip);
