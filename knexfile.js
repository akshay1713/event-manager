const config  = require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: config.db.host,
      user: config.db.username,
      password: config.db.password,
      database: config.db.name,
      charset: 'utf8',
      port: config.db.port
    }
  },

  staging: {
  },

  production: {
    client: 'mysql',
    connection: {
      host: config.db.host,
      user: config.db.username,
      password: config.db.password,
      database: config.db.name,
      charset: 'utf8',
      port: config.db.port
    }
  }

};