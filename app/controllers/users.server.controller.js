'use strict';

var passport = require('passport');

exports.signin = function(req, res){
  passport.authenticate('local', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failure'
  });
};


exports.signout = function(req, res){
	req.logout();
  res.end();
};

exports.loginSuccess = function(req, res){
  res.json({
    success: true,
    user: req.session.passport.user
  });
};

exports.loginFailure = function(req, res){
  res.json({
    success:false,
    message: 'Invalid username or password.'
  });
};
