var routes  = [];
var config  = {};
var levelup = require('levelup');
var bcrypt  = require('bcrypt');
var fs      = require('fs');

/**
 * route configuration for '/signup'
 */

config.handler = function (request) {
  var payload  = request.payload;
  var users    = levelup('db/stbstatus', { valueEncoding: 'json' });
  var nskey    = 'users!' + payload.email;
  var session  = this.session;
  var password = bcrypt.hashSync(payload.password, 8);
  var maildata;

  var api_key  = process.env.MAILGUN_API_KEY;
  var domain   = process.env.MAILGUN_DOMAIN;

  // key: email, val: { password: <string> }
  users.put(nskey, { password: password }, function (err) {
    // close the database else there will be lock issues
    users.close(function (err) { });

    if (err) request.reply({ error: 'unable to store user in database.' });

    // login expires 24 hours from now
    session.set('user', { email: payload.email, expires: Date.now() + 86400000 });

    // instruct user to redirect to dashboard
    request.reply({ location: '/dashboard', info: payload });

    if (!api_key || !domain) {
      console.log('Mailgun API key and/or domain not set...no email will be sent');
      return;
    }

    fs.readFile('app/templates/welcome-email.html', 'utf8', function(err, template) {
      var mailgun  = require('mailgun-js')(api_key, domain);

      maildata = {
        from: 'stbstatus <stbstatus@' + domain + '>',
        to: payload.email,
        subject: 'Welcome to Stbstatus!',
        html: template.replace('{{email}}', payload.email)
      };

      mailgun.messages.send(maildata, function (error, response, body) {});
    });
  });
};

routes.push({ method: 'POST', path: '/signup', config: config });

/**
 * attach
 */

module.exports = function (server) {
  routes.forEach(server.addRoute.bind(server));
};
