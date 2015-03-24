'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../../app/models/user.server.model');

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			User.find({username: username}).success(function(user){
	      if (!user){
	        return done(null, false, { message: 'Nobody here by that name'} );
	      }
	      if (user.password !== password){
	        return done(null, false, { message: 'Wrong password'} );
	      }
	      return done(null, { username: user.username });
	    });
		}
	));
};
