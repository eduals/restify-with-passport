'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res, next){
	res.send({ success: true, session: req.session });
	return next();
};


exports.hello_world = function(req, res, next){
  res.send({hello: 'world'});
  return next();
};
