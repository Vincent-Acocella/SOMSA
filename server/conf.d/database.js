const Sequelize = require('sequelize');

//Connection to mysql db
 module.exports = new Sequelize('SOMSAdb','SOMSA','SOMSA', {

    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: 0,

    pool: {
        max: 15,
        min: 0,
        acquire: 1300000,
        idle: 100000,
    },
});