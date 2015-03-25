'use strict';

var passport = require('passport');

exports.signin = function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    // Technically, the user should exist at this point, but if not, check
    if(!user) {
      return next(new restify.InvalidCredentialsError("Please check your details and try again."));
    }

    // Log the user in!
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      console.log('AUTHENTICATED: ' + req.isAuthenticated());
      req.session.user_id = user.id;

      res.send(200, req.session);

      return next();
    });
	})(req, res, next);
};


exports.signout = function(req, res){
	req.logout();
  res.end();
};

exports.me = function(req, res){
  console.log(req.session);
  console.log("IS AUTH: "+ req.isAuthenticated());
  if (!req.isAuthenticated()) {
		return res.send(401, {
			message: 'Employee is not logged in'
		});
	}
  console.log(req.user);
  res.send(200, req.user);
	return next();
};
