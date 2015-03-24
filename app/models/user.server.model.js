'use strict';

module.exports = function(sequelize){
  var User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
      field: 'username'
    },
    password: {
      type: Sequelize.STRING,
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
  });

  return User;
};
