const {check, validationResult} = require('express-validator')

exports.userValidatorResult = (req,res,next) =>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success:false, error});
    }
    next();
};

exports.userValidator = [
    check('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email not valid'),

    check('username').trim().not().isEmpty().withMessage('Username is required')
    .isLength({min: 3, max:20}).withMessage('Username bust be 3-20 characters long'),

    check('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({min: 8}).withMessage('Password bust be at least8 characters long')
];