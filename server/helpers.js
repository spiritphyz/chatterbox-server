exports.respond = function(res, data, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(data);
};

exports.send404 = function(res) {
  exports.respond(res, 'Not Found', 404);
};