const config  = require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: config.host,
      user: config.db.username,
      password: config.db.password,
      database: config.db.name,
      charset: 'utf8'
    }
  },

  staging: {
  },

  production: {
  }

};