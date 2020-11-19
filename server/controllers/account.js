
const Account = require('../models/account')

exports.signUpUser = async (req,res) => {
    const user = await Account.findOne({where: {Email: req.body.email}})
    if(user !== null){
        return res.status(400).json({success: false, error: 'This email already in use'})
    }

    await Account.create({
            Email: req.body.email,
            Username: req.body.username,
            Password: req.body.password,
            Favorites: {}
        }) 
        res.status(201).json({success:true})
}

exports.signInUser = async (req,res) =>{
    const {email, password} = req.body;
    const newUser = new Account();

    newUser = await Account.findOne({where: {Email: email}}) 

    if(user === null){
        return res.status(401).json({success: false, error: 'User not found'});
    }
    const isMatch = newUser.validPassword(password)

    if(!isMatch){
        return res.status(401).json({success: false, error: 'Password does not match email'})
    }

    res.json({success:true, user})
}