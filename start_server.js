exports.StartServer = function() {

  var init = require('./config/init'),
      config = require('./config/config'),
      db = require('./config/database');

  // Add coloring for console output
  require('colors');

  // Verify database connection and sync tables
  db.sequelize.authenticate().complete(function(err) {
    if (!!err) {
      throw '✗ Database Connection Error: '.red;
    }
    else {
      console.log('✔ Database Connection Success!'.green);
      db.sequelize.sync()
      .then(function() {
        console.log('✔ Database Synced!'.green);
      }).catch(function() {
        console.log('✗ Database Not Synced!'.red);
      });
    }
  });

  var server = require('./config/server')();

  server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
  });


};
