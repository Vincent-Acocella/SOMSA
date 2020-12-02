const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const Sentiment = require('./sentiment');
const Topic = require('./topic');

Topic.belongsTo(Sentiment, {
    foreignKey: 'Sentiment_ID'
});
Sentiment.hasOne(Topic);

module.exports = {Topic, Sentiment}