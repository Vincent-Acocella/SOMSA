const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const User = require('../models/user');

router.get('/findall', (req, res) => 

    User.findAll()
    .then(user => {
        console.log(user);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
    );

// router.post('/adduser', (req,res) =>{
//     let (User_ID , Search_History) = req.body;
//     let error = [];

//     //Valiadate


// });



// User.create({
//     title

// }) 
module.exports = router;