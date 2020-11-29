const { userInfo } = require('os');
const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const Account = require('./account');
const Topic = require('./topic');

Account.belongsToMany(Topic);
Topic.belongsToMany(Account);

module.exports = {Account, Topic}