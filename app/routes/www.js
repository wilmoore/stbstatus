/**
 * route configuration for '/www'
 */

module.exports = function (server) {
  server.route({
    method: 'GET',
    path:   '/{path*}',
    handler: {
      directory: { path: './www', listing: false, index: true }
    }
  });
};
