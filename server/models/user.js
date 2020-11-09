const Sequalize = require('sequelize');
const db = require('../conf.d/database');

const User = db.define('user', {
    Username:{
        type: Sequalize.STRING
    },
    Email:{
        type: Sequalize.STRING
    },
    Password:{
        type: Sequalize.STRING
    },
    Favorites:{
        type: Sequalize.ARRAY
    }
})

module.exports = User;