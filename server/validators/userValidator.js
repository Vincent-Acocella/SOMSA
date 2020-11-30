const {check, validationResult} = require('express-validator')

exports.userValidatorResult = (req,res,next) =>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = result.array()[0];
        return res.status(422).json({success:false, error});
    }
    next();
};

exports.userValidator = [
    check('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email not valid'),

    check('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({min: 8}).withMessage('Password bust be at least 8 characters long')
];