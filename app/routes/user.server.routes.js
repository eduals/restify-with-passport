'use strict';

module.exports = function(server) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users api
  server.get('/auth/signin', users.signin);
  server.get('/auth/signout', users.signout);

};
