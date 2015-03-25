module.exports = {

  name: 'REST API Sample',
  version: '1.0.0',
	port: process.env.PORT || 3000,
  url: 'http://127.0.0.1',
  cookie_name: 'myapp',
  session_secret: 'secret',
  getDBUrl: function(){
    var url = 'postgres://' +
            this.database.user + ':' +
            this.database.pass + '@' +
            this.database.host + ':' +
            this.database.port + '/' +
            this.database.name;
    console.log(url);
    return url;
  },
  dbOptions: {
    // Database Type
    dialect: 'postgres',

    // max concurrent database requests; default: 50
    maxConcurrentQueries: 50,

    // disable inserting undefined values as NULL
    // - default: false
    omitNull: false,

    // a flag for using a native library or not.
    // in the case of 'pg' -- set this to true will allow SSL support
    // - default: false
    native: false,

    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: {timestamps: false}
    // is basically the same as:
    //   sequelize.define(name, attributes, { timestamps: false })
    // so defining the timestamps for each model will be not necessary
    define: {
      lodashd: false,
      freezeTableName: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
    },

    // similiar for sync: you can define this to always force sync for models
    sync: {
      force: false
    },

    // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
    syncOnAssociation: true,

    // use pooling in order to reduce db connection overload and to increase speed
    // currently only for mysql and postgresql (since v1.5.0)
    pool: {
      maxConnections: 5,
      maxIdleTime: 30
    },

    // language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
    // options are: en [default], es
    language: 'en'
  }

};
