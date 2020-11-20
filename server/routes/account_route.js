const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const {signUpUser, signInUser, signOutUser} = require('../controllers/account')
const {
    userValidatorResult,
     userValidator
    } = require('../validators/userValidator')

const {isAuth} = require('../middlewares/auth')

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

router.get('/signout', signOutUser)

router.get('/secret', isAuth, (req,res)=>{
     console.log(req.user)
     res.json({success: true, message: "You are inside our secret page "})
})

module.exports = router;