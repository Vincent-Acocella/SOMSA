const JWT = require('jsonwebtoken')
const Account = require('../models/account')

exports.isAuth = async (req,res, next) => {
    const isValid = await verifyToken(req)

    if(!isValid){
        return res.status(401).json({success: false, error: 'User not Found'})
    }
    req.user = isValid
    next();
};

const verifyToken = async (req) => {
    if(!req.cookies.auth_token){
        return false;
    }
    console.log(req.cookies.auth_token)
    console.log(process.env.JWT_SECRET)
    let token= req.cookies.auth_token.toString()
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    console.log(decode)
    
    const user = await Account.findOne({where: {Account_id: decode.id}}); 

    if(!user === null){
        return false;
    }
    return user;
}