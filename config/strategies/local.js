'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../database').User;

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			session: true
		},
		function(username, password, done) {
			User.find({where : {username: username}}).then(function(user){
	      if (!user){
	        return done(null, false, { message: 'Nobody here by that name'} );
	      }
	      if (user.password !== password){
	        return done(null, false, { message: 'Wrong password'} );
	      }
	      return done(null, user);
	    }).catch(function(err){
				console.log('error in query ' + err);
			});
		}
	));
};
