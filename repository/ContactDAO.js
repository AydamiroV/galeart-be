// App modules
const knex = require('../utils/db');

class ContactDAO {

    constructor() {
    }

    saveMessage(name, email, message) {
        knex.table('message').insert({name, email, message});
    }
}

module.exports = new ContactDAO();