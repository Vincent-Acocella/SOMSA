const Sequelize = require('sequelize');

//Connection to mysql db
 module.exports = new Sequelize('SOMSAdb','SOMSA','SOMSA', {

    host: 'mysql',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000,
    },
});