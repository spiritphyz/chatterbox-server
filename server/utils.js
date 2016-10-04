exports = exports.modules = {};

exports.defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.statusCode = 200;
var headers = defaultCorsHeaders;
headers['Content-Type'] = 'application/JSON';
exports.headers = headers;
