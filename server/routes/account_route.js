const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const {signUpUser, signInUser, signOutUser,addFavorite,removeFavorite,search,changePassword} = require('../controllers/account')
const {userValidatorResult, userValidator} = require('../validators/userValidator')

const {isAuth} = require('../middlewares/auth')

router.get('/', (req, res) => {
    
    Account.findAll()
    .then(users => {
        res.status(200).json({success: true, users});
    })
    .catch(err => console.log(err))
});

router.post('/signup', userValidator, userValidatorResult, signUpUser); 
//Sign in user
router.post('/signin', signInUser)

router.get('/signout', signOutUser)

router.get('/secret', isAuth, (req,res)=>{
     console.log(req.user)
     res.json({success: true, message: "You are inside our secret page "})
})

router.post('/updatePassword', changePassword);

router.post('/addFavorite', addFavorite);

router.post('/removeFavorite', removeFavorite);

router.post('/search', search);
module.exports = router;
