var routes = [];
var config = {};

/**
 * route configuration for '/'
 */

config.handler = function (request) {
  request.reply.redirect('/signin.html').permanent(true);
};

routes.push({ method: 'GET', path: '/', config: config });

/**
 * attach
 */

module.exports = function (server) {
  routes.forEach(server.addRoute.bind(server));
};
