define(function(require, exports, module){

  var expect = require('./chai').expect;
  var assert = require('./chai').assert;
  var signup = require('../www/js/app/signup');

  describe('signup', function() {
    var clock, server;

    beforeEach(function() {
      clock  = sinon.useFakeTimers();
      server = sinon.fakeServer.create();
    });

    afterEach(function () {
      // tear down fakes
      clock.restore();
      server.restore();
    });

    it('invokes XHR onload callback', function() {
      var data    = { location: 'http://example.com' };
      var form    = document.createElement('form');
      var request = signup.postform(form);

      server.respondWith([200, { "Content-Type": "application/json" }, JSON.stringify(data)]);

      sinon.spy(request, 'onload');

      server.respond();

      assert(request.onload.called);
    });

  });

});
