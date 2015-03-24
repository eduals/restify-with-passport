'use strict';
var config = require('./config'),
    Sequelize = require('sequelize'),
    path = require('path'),
    _ = require('lodash');

var db = {
  sequelize: new Sequelize(config.getDBUrl(), config.dbOptions),
  Sequelize: Sequelize
};


// Globbing model files

config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
	var model = require(path.resolve(modelPath))(db);
  db[_.capitalize(model.name)] = model;
});

module.exports = db;
