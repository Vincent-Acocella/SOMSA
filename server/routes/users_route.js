const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const User = require('../models/user');

router.get('/', (req, res) => 

    User.findAll()
    .then(user => {
        console.log(user);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
    );

router.get('/add', (req,res)=> {

    console.log(req.body);

    var Search_History = {"one" : [15, 4.5],
    "two" : [34, 3.3],
    "three" : [67, 5.0],
    "four" : [32, 4.1]};
    
    User.create({
        Search_History 
    })
    .then(user => res.redirect('/user'))
    .catch(err => console.log(err))
})

router.post('/add', (req,res) =>{
    console.log("HELO" + req.body)
    // let (User_ID , Search_History) = req.body;
    // let error = [];

    //Valiadate


});
module.exports = router;