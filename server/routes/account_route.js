const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const {signUpUser, signInUser} = require('../controllers/account')
const {
    userValidatorResult,
     userValidator
    } = require('../validators/userValidator')



router.get('/', (req, res) => {
    
    Account.findAll()
    .then(users => {
        res.status(200).json({success: true, users});
    })
    .catch(err => console.log(err))
});

//Add a user
router.post('/signup', userValidator, userValidatorResult, signUpUser); 
//Sign in user
router.post('/signin', signInUser)

module.exports = router;