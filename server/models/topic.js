const Sequalize = require('sequelize');
const db = require('../conf.d/database');

const Topic = db.define('user', {
    
    Topic_Id: {
        type: Sequalize.STRING
    },

    Catagory: {
        type: Sequalize.STRING
    }
})

module.exports = Topic;