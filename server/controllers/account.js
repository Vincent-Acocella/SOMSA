
const Account = require('../models/account');
const bcrypt = require('bcrypt');
const JWT = require('json')
exports.signUpUser = async (req,res) => {

    let newUser = new Account();
    newUser = await Account.findOne({where: {Email: req.body.email}});
    if(newUser !== null){
        return res.status(400).json({success: false, error: 'This email already in use'});
    }
    let password = req.body.password;
    try{
         password = await bcrypt.hash(password, bcrypt.genSaltSync(8))
    }catch(e){
        console.log({e});
    }
   
    await Account.create({
            Email: req.body.email,
            Username: req.body.username,
            Password: password,
            Favorites: {}
        }) 
        res.status(201).json({success:true})
}

exports.signInUser = async (req,res) =>{
   
    let newUser = new Account();
    newUser = await Account.findOne({where: {Email: req.body.email}}); 
    
    if(newUser === null){
        return res.status(401).json({success: false, error: 'User not found'});
    }

    let isMatch = await newUser.validPassword(req.body.password);

    if(!isMatch){
        return res.status(401).json({success: false, error: 'Password does not match email'});
    }
    res.json({success:true, newUser});
}