const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const bcrypt = require('bcrypt');

const Account = db.define('Account', {
    Account_ID:{
        type: Sequalize.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    
    Email: {
        type: Sequalize.STRING
    },

    Password: {
        type: Sequalize.STRING
    },

    Username:{
        type: Sequalize.STRING
    },
    
    Favorites:{
        type: Sequalize.JSON
    }
},
{
    freezeTableName: true,
    timestamps: false,
    instanceMethods:{
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});     


module.exports = Account;