const Lab = require('lab');
const server = require("../shortener.js").server;
const lab = exports.lab = Lab.script();
const code = require('code');

lab.before(function (done) {
  server.on('pluginsLoaded', done)
});

lab.test("home", function(done) {
  let options = {
    method: "GET",
    url: "/"
  }

  server.inject(options, function (response) {
    var result = response.result;
    code.expect(response.statusCode).to.equal(200);
    done();
  });
});