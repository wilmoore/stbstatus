var routes  = [];
var config  = {};

/**
 * route configuration for '/logout'
 */

config.handler = function (request) {
  this.session.reset();
  request.reply.redirect('/signin.html');
};

routes.push({ method: 'GET', path: '/logout', config: config });

/**
 * attach
 */

module.exports = function (server) {
  routes.forEach(server.addRoute.bind(server));
};
