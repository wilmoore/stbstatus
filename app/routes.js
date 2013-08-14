module.exports = function (server) {
  require('./routes/www')(server);
  require('./routes/api')(server);
  require('./routes/index')(server);
  require('./routes/logout')(server);
  require('./routes/signin')(server);
  require('./routes/signup')(server);
  require('./routes/dashboard')(server);
};
