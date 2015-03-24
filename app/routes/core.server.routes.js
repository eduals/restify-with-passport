'use strict';

module.exports = function(server) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	server.get('/', core.index);

	server.get('/hello/world', core.hello_world);
};
