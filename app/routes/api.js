var routes = [];
var config = {};

/**
 * route configuration for '/'
 */

config.handler = function (request) {
  var http = require('request');
  var url  = 'http://192.168.0.176:8080/info/getLocations';

  http({url: url, timeout: 5000}, function(error, response, body){
    if (error || response.statusCode !== 200) {
      throw error;
    }

    request.reply(JSON.parse(body));
  });
};

routes.push({ method : 'GET', path : '/api/locations', config : config });

/**
 * attach
 */

module.exports = function (server) {
  routes.forEach(server.addRoute.bind(server));
};
