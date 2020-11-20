const Account = require('../models/account');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const signToken = (userID)=> {
    return JWT.sign({id: userID}, process.env.JWT_SECRET);
}

exports.signUpUser = async (req,res) => {
    try{

        let newUser = await Account.findOne({where: {Email: req.body.email}});
        
        if(newUser !== null){
            return res.status(400).json({success: false, error: 'This email already in use'});
        }
        let password = req.body.password;
        try{
            password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
        }catch(e){
            console.log({e});
        }
                    
       newUser = await Account.create({
            Email: req.body.email,
            Username: req.body.username,
            Password: password,
            Favorites: {}
        }) 
        
        const token = signToken(newUser.Account_ID)
        res.cookie('auth_token', token,{
            httpOnly: true
        })


        res.status(201).json({success:true, email: req.body.email, username: req.body.username});
    }catch(error){
        res.status(500).json({success: false, error: 'An error Occured'})

    }
}


exports.signInUser = async (req,res) =>{

    try{
    let newUser = await Account.findOne({where: {Email: req.body.email}}); 
    
    if(newUser === null){
        return res.status(401).json({success: false, error: 'User not found'});
    }

    let isMatch = await newUser.validPassword(req.body.password);

    if(!isMatch){
        return res.status(401).json({success: false, error: 'Password does not match email'});
    }

    
    const token = signToken(newUser.Account_ID)
    res.cookie('auth_token', token,{
        httpOnly: true
    })

    res.json({success:true, newUser});

    }catch(error){
        res.status(500).json({success: false, error: 'An error Occured'})
    }
}

exports.signOutUser = (req,res) =>{
    res.clearCookie('auth_token');
    res.json({success:true})
}