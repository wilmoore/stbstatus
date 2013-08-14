var options = {
  cookieOptions: { password: 'password', isSecure: false }
};

module.exports = function (server) {

  server.pack.allow({ ext: true }).require('yar', options, function (err) {
    if (err) { console.log(err); throw err; }
  });

};
