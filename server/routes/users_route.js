const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const Account = require('../models/account');


//Get a single and or password from the db
router.get('/', (req, res) => 

    User.findAll()
    .then(user => {
        console.log(user);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
    );

router.post('/add', (req,res)=> {

    //(getSingle(req.body.user.email);
    Account.create({

        Username: '',
        Email: '',
        Password: ''
    })

    .then(user => res.redirect('/user'))
    .catch(err => console.log(err))
})

router.post('/signin', (req,res) => {

    console.log(req.body.user.email)
    var email = String(req.body.user.email)
    var password = String(req.body.user.password)

    console.log("The email is: " + email + "the password is: " + password)
    res.status(200).send(req.body.user.email);
});   

function getSingle(email, password){
    if(password === null){
       return Account.findAll({
            //Select
            attributes: ['Email'],
            where:{
                Email: {email}
            }    
        });

    }else{  

    }
}

module.exports = router;