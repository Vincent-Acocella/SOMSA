const Sequalize = require('sequelize');
const db = require('../conf.d/database');

const Topic = db.define('Topic', {

    Topic_ID:{
        type: Sequalize.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    
    Topic_Name: {
        type: Sequalize.STRING
    },

    Category: {
        type: Sequalize.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Topic;