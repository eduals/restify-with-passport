'use strict';

var passport = require('passport');

exports.signin = function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
		if (err || !user) {
			res.send(400, info);
		} else {
      console.log('hahahahahaha');
      req.login(user, function(err) {
        console.log('logged');
        console.log(user);
          if (err) {
              res.send(400, err);
          } else {
              res.send(200, user);
          }
      });
		}
	})(req, res, next);
};


exports.signout = function(req, res){
	req.logout();
  res.end();
};

exports.me = function(req, res){
  if (!req.isAuthenticated()) {
		return res.send(401, {
			message: 'Employee is not logged in'
		});
	}

	// next();
  res.send(200, req.user);
};
