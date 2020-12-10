const Account = require('../models/account');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Topic = require('../models/topic');
const sequelize  = require('sequelize');
const op = sequelize.Op;

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

exports.changePassword = async (req, res) =>{
    console.log(req.body);
    let password = req.body.password;
        try{
            password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
        }catch(e){
            console.log({e});
            return;
        }
    Account.update(
        {Password: password},
        {where: {Account_ID: req.body.id}}
    );
    res.json({success: true});
}

exports.addFavorite = async (req, res) => {
    let favorites = {}
    try{
        currentFavorites = await Account.findOne(
            {where: {Account_ID: req.body.accountId},
            attributes: ['Favorites']
        })
        favorites = currentFavorites.Favorites || {};
        //JSON.parse(favorites);
    }

    catch(e) {
        console.log(e);
    }
    console.log(favorites);
    let topicId = req.body.topicId;
    favorites[topicId] = req.body.topicId
    console.log(favorites);

    Account.update(
        {Favorites: favorites},
        {where: {Account_ID: req.body.accountId}}
    );
    res.json({success: true});
}

exports.removeFavorite = async (req, res) => {
    let favorites = {}
    try{
        currentFavorites = await Account.findOne(
            {where: {Account_ID: req.body.accountId},
            attributes: ['Favorites']
        })
        currentFavorites = currentFavorites.Favorites;
        delete currentFavorites[req.body.topicId];
        Account.update(
            {Favorites: currentFavorites},
            {where: {Account_ID: req.body.accountId}}
        );
    }

    catch(e) {
        console.log(e);
        return;
    }
    res.json({success: true});
}

//Search function is only for users
exports.search = async (req, res) => {
    let results = null;
    try{
        let query = await Topic.findAll(
            {where: {
                Topic_Name:{ 
                    [op.like]: '%' + req.body.search + '%'
                }
            }}
        );
        console.log(query);
        if (query.length == 0) {
            query = null;
        }
        results = query;
    }
    catch(e) {
        console.log(e);
    }
    if (results) {
        results["success"] = true
        res.status(201).json(results);
        return;
    }
    res.status(401).json({success: false, error: "No results for " + req.body.search + " found."});
}
