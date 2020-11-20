const Account = require('../models/account');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();


const signToken = (userID)=> {
    return JWT.sign({id: userID}, process.env.JWT_SECRET);
}

exports.signUpUser = async (req,res) => {

    let newUser = new Account();
    newUser = await Account.findOne({where: {Email: req.body.email}});
    if(newUser !== null){
        return res.status(400).json({success: false, error: 'This email already in use'});
    }
    let password = req.body.password;
    try{
         password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
    }catch(e){
        console.log({e});
    }
                   
    await Account.create({
        Email: req.body.email,
        Username: req.body.username,
        Password: password,
        Favorites: {}
    }) 
    res.status(201).json({success:true, email: req.body.email, username: req.body.username});
}

exports.signInUser = async (req,res) =>{
   
    let newUser = await Account.findOne({where: {Email: req.body.email}}); 
    console.log(newUser.Account_ID)
    
    if(newUser === null){
        return res.status(401).json({success: false, error: 'User not found'});
    }

    let isMatch = await newUser.validPassword(req.body.password);

    if(!isMatch){
        return res.status(401).json({success: false, error: 'Password does not match email'});
    }

    
    // const token = signToken(newUser.Account_ID)
    // res.cookie('auth_token', token,{
    //     httpOnly: true
    // })

    res.json({success:true, newUser});
}