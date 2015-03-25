module.exports = function(){
  var config = require('./config'),
      path = require('path');

  var restify = require('restify'),
      session = require('restify-session')({
          debug : false,
          ttl   : 2
      }),
      server = restify.createServer({
        name: config.name,
        version: config.version,
        url: config.url + ':' + config.port
      }),
      flash = require("connect-flash"),
      passport = require("passport");

  require('./passport')();

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

  // server.use(flash());
  server.use(session.sessionManager);
  server.use(passport.initialize());
  server.use(passport.session());

  // Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(server);
	});


  return server;
};
