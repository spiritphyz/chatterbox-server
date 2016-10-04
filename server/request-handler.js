var userData = [{ text: 'xxxxxxxx', username: 'Alice'}, { text: 'zzzzzzz', username: 'Bobby' }];

var requestHandler = function(request, response) {
  var path = require('path');
  var url = require('url');
  var shortid = require('shortid');
  var parsedUrl = url.parse(request.url);
  // var endPoint = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  var endPoint = parsedUrl.pathname;
  var method = request.method;
  var url = request.url;
  var headers = request.headers;
  var body = [];
  var endPoints = { '/classes/messages/': true, '/classes/room/': true, '/': true };

  var defaultHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // in seconds
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  var headers = defaultHeaders;
  headers['Content-Type'] = 'application/JSON';
  if( method === 'OPTIONS') {
    response.writeHead(201, defaultHeaders);
    response.end();
  }
  if ( method === 'POST' && endPoints[endPoint] ) {
    request.on('data', function(chunk) {
      body.push(chunk);
    })
    .on('end', function() {
      body = Buffer.concat(body).toString();
      var parsed = JSON.parse(body);
      parsed['objectId'] = shortid.generate();
      userData.unshift(parsed);
      response.writeHead(201, headers);
      response.end(JSON.stringify({results: userData}));
    });
  }

  if ( method === 'GET' && endPoints[endPoint] ) {
    response.writeHead( 200, headers );
    response.end(JSON.stringify({results: userData}));
  }

  if ( !endPoints[endPoint] ) {
    response.writeHead(404, headers);
    response.end();
  }
  
  request.on('error', function(err) {
    console.error(err.stack);
  });
};

var exports = module.exports = {};
module.exports.requestHandler = requestHandler;
