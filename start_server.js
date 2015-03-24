exports.StartServer = function() {

  var init = require('./config/init'),
      config = require('./config/config')
      Sequelize = require('sequelize');

  var sql = new Sequelize(config.database.name, config.database.user, config.database.pass, {
    host: 'localhost',
    dialect: config.database.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  var server = require('./config/server')(sql);

  server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
  });


};
