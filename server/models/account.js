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
    timestamps: false
});     

Account.prototype.hashPassword = function(password){
    console.log(" ddjifjiolasdfioasdiofjiopassword")
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
}
Account.prototype.validPassword = function(password){
    return bcrypt.compare(password, this.Password);
}

module.exports = Account;