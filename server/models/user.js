const Sequalize = require('sequelize');
const db = require('../conf.d/database');

const User = db.define('User' , {
    User_ID:{
        type: Sequalize.STRING,
        primaryKey: true
    },
    Search_History:{
        type: Sequalize.STRING
    }
    
},{
    freezeTableName: true,
    timestamps: false
})
module.exports = User;