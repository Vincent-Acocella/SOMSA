const Sequalize = require('sequelize');
const db = require('../conf.d/database');

const Topic = db.define('Topic', {
    
    Topic_Name: {
        type: Sequalize.STRING
    },

    Catagory: {
        type: Sequalize.STRING
    }
})

module.exports = Topic;