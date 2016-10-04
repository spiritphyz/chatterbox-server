
var requestHandler = function(request, response) {
  var userData = [
    {
      //createdAt: '2016-10-03T23:22:38.747Z',
      //objectId: 'qpcIw5cVHH',
      ///roomname: 'lobby',
      text: 'xxxxxxxx',
     // updatedAt: '2016-10-03T23:22:38.747Z',
      username: 'AussieSox'
    },
    {
      //createdAt: '2016-10-03T18:16:52.235Z',
      //objectId: 'RLnHnguqwE',
      //roomname: 'lobby',
      text: 'zzzzzzz',
      //updatedAt: '2016-10-03T18:16:52.235Z',
      username: 'BobbySox'
    }
  ];

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

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url + 'in request handler');
  
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/JSON';


 

  request.on('error', function(err) {
    console.error(err.stack);
  });


  if (method === 'POST' && endPoint === '/classes/messages') {
    request.on('data', function(chunk) {
      body.push(chunk);
    })
    .on('end', function() {
      body = Buffer.concat(body).toString();
      var parsed = JSON.parse(body);
      userData.unshift(parsed);
      response.writeHead(201, headers);
      response.end(JSON.stringify({results: userData}));
    });
  } 
  if (method === 'GET') {
    response.writeHead( 200, headers );
    response.end(JSON.stringify({results: userData}));
  }
};


var exports = module.exports = {};
module.exports.requestHandler = requestHandler;

