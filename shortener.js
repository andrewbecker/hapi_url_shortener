const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes');
const mongoose = require('mongoose');
const mongoUri = process.env.MONGOURI || 'mongodb://localhost:27017/shortio';

const options = {
  server: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  },
  replset: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  }
};

mongoose.connect(mongoUri, options);

const db = mongoose.connection;

/* SERVER INITIALIZATION
 * -----------------------------------------------------------------------
 * We initialize the server once the connection to the database was set
 * with no errors; we also need to set CORS to true if we want this
 * API to be accessible in other domains. In order to serve static files
 * I used the Hapi plugin called 'inert', hence the call to 'require'.
 =======================================================================*/

server.connection({
  port: process.env.PORT || 3000
});

server.register(require('inert'), (err) => {
  db.on('error', console.error.bind(console, 'connection error:'))
    .once('open', () => {
      server.route(routes);

      server.start(err => {
        if (err) throw err;
        server.emit('pluginsLoaded');
        console.log(`Server running at port ${server.info.port}`)
      })
    });

});

exports.server = server;