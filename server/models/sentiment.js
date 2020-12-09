const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const Topic = require('./topic');
const Sentiment = db.define('Sentiment', {

    Sentiment_ID:{
        type: Sequalize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    Sentiment: {
        type: Sequalize.BOOLEAN
    },

    Confidence_Interval: {
        type: Sequalize.INTEGER
    },

    Table_Data: {
        type: Sequalize.JSON
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = Sentiment;