// App modules
const config = require('../appConfig');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : config.db.host,
    user : config.db.user,
    password : config.db.password,
    database : config.db.database
  }
});

module.exports = knex;