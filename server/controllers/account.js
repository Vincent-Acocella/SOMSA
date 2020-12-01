const Account = require('../models/account');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

//Creates token
const signToken = (userID)=> {
    return JWT.sign({id: userID}, process.env.JWT_SECRET);
}
//Used for signup
exports.signUpUser = async (req,res) => {
    console.log(req.body.email);
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
            Password: password,
            Favorites: {}
        }) 
        
        const token = signToken(newUser.Account_ID)
        res.cookie('auth_token', token,{
            httpOnly: true
        })


        res.status(201).json({success:true, email: req.body.email, favorites: req.body.favorites});
    }catch(error){
        res.status(500).json({success: false, error})

    }
}

exports.signInUser = async (req,res) =>{
    console.log(req.body)

    try{
    let newUser = await Account.findOne({where: {Email: req.body.email}}); 
    
    if(newUser === null){
        return res.status(401).json({success: false, error: 'User not found'});
    }

    let isMatch = await newUser.validPassword(req.body.password);


    if(!isMatch){
        return res.status(401).json({success: false, error: 'Password does not match email'});
    }


    let email = newUser.Email;
    let favorites = newUser.Favorites;

    res.json({success:true, email, favorites});

    }catch(error){
        res.status(500).json({success: false, error: 'An error Occured'})
    }
}
//Rmeove token
exports.signOutUser = (req,res) =>{
    res.clearCookie('auth_token');
    res.json({success:true})
}