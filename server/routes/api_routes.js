const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const Account = require('../models/account');


//Look up an account and see if it matches
router.get('./api', (req,res) =>
     console.log(req)
)

//Add a user
router.post('./add', (req,res)=> {
    const data = {
        email: "Sugma@sugma.com",
        password: "1234"
    }
        let {email,password} = data;
    
    Account.create({
        Email: {email},
        Username: {username},
        Password: {password},
        Favorites
    })
    .then(user => res.redirect('./api'))
    .catch(err => console.log(err))

})


module.exports = router;