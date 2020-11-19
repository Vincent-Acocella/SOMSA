
const Account = require('../models/account')

exports.signUpUser = async (req,res) => {

    let newUser = new Account();
    newUser = await Account.findOne({where: {Email: req.body.email}})
    if(newUser !== null){
        return res.status(400).json({success: false, error: 'This email already in use'})
    }
    console.log(req.body.password)
    let password = await newUser.hashPassword(req.body.password);

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
    console.log(isMatch)

    // if(!isMatch){
    //     return res.status(401).json({success: false, error: 'Password does not match email'});
    // }
    res.json({success:true, newUser});
}