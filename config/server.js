module.exports = function(sql){
  var config = require('./config'),
      path = require('path');

  var restify = require('restify'),
      session = require('restify-session')({
          debug : true,
          ttl   : 2
      }),
      server = restify.createServer({
        name: config.name,
        version: config.version,
        url: config.url + ':' + config.port
      }),
      flash = require("connect-flash"),
      passport = require("passport");


	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath))(sql);
	});


  require('./passport');

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

  server.use(flash());
  server.use(session.sessionManager);
  server.use(passport.initialize());
  server.use(passport.session());

  // Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(server);
	});


  return server;
};
