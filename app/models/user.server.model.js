'use strict';

module.exports = function(db){
  var User = db.sequelize.define('user', {
    firstName: {
      type: db.Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: db.Sequelize.STRING
    },
    username: {
      type: db.Sequelize.STRING,
      field: 'username'
    },
    password: {
      type: db.Sequelize.STRING,
      field: 'password'
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  User.sync({force: true}).then(function () {
    // Table created
    return User.create({
      firstName: 'Jason',
      lastName: 'Villalon',
      username: 'jasonv',
      password: 'jasonv'
    });
  }).catch(function(err){
    console.log(err);
  });

  return User;
};
