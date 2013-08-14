var Hapi   = require('hapi');
var config = require('./app/config');
var routes = require('./app/routes');

// base server options
var options = {
  views: {
    path: 'app/templates', engines: { html: 'handlebars' }
  }
};

// server and port binding
var server = new Hapi.Server('0.0.0.0', 7777, options);

// configure server
config(server);

// connect routes
routes(server);

// start server
server.start(function () {
  console.log('server started on port: ', server.info.port);
});
