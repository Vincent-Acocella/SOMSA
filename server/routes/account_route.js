const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const Account = require('../models/account');
const {signUpUser, signInUser} = require('../controllers/account')


router.get('/', (req, res) => {
    
    Account.findAll()
    .then(user => {
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
});

//Add a user
router.post('/signup', signUpUser) 

//Sign in user
router.post('/signin', signInUser)

router.get('/:id', (req,res) =>{
    console.log(req.params.id);
})

module.exports = router;