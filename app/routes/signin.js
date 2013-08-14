var routes  = [];
var config  = {};
var levelup = require('levelup');
var bcrypt  = require('bcrypt');

/**
 * route configuration for '/signin'
 */

config.handler = function (request) {
  var payload  = request.payload;
  var users    = levelup('db/stbstatus', { valueEncoding: 'json' });
  var email    = 'users!' + payload.email;
  var error    = 'Login/password combination not found.';
  var session  = this.session;

  // key: email, val: { password: <string> }
  users.get(email, function (err, user) {
    // close the database else there will be lock issues
    users.close(function (err) { });

    if (err || !bcrypt.compareSync(payload.password, user.password)) {
      request.reply({ error: error });
    }

    // login expires 24 hours from now
    session.set('user', { email: payload.email, expires: Date.now() + 86400000 });

    // instruct user to redirect to dashboard
    request.reply({ location: '/dashboard', info: payload });
  });
};

routes.push({ method: 'POST', path: '/signin', config: config });

/**
 * attach
 */

module.exports = function (server) {
  routes.forEach(server.addRoute.bind(server));
};
