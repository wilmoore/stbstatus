var routes  = [];
var config  = {};

/**
 * route configuration for '/'
 */

config.handler = function (request) {
  var user = this.session.get('user');

  if (!user) {
    request.reply.redirect('/signin.html');
  }

  request.reply.view('dashboard.html', user);
};

routes.push({ method: 'GET', path: '/dashboard', config: config });

/**
 * attach
 */

module.exports = function (server) {
  routes.forEach(server.addRoute.bind(server));
};
