const skins = require('../models/skin');
const {rateLimit} = require('express-rate-limit');
const {body, validationResult} = require('express-validator');
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next()
    } else {
        req.flash('error', 'You need to Log in first.');
        res.redirect('/users/login');
    }
}

exports.isGuest = (req, res, next) => {
    if(!req.session.user){
        return next()
    } else {
        req.flash('error', 'You have already logged in.');
        res.redirect('/users/profile');
       
    }
}

exports.isAuthor = (req, res, next) => {
    let id = req.params.id;

    skins.findById(id)
    .then( skin => {
        if(skin.owner == req.session.user){
            return next();
        } else {
            let err = new Error('Unauthorized user.');
            err.status = 401;
            return next(err);
        }
    })
    .catch(err=> next(err))
}

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    let offeritem1 = req.params.item1;
    let offeritem2 = req.params.item2;
    let offerid = req.params.offer;
    
    if(!id?.match(/^[0-9a-fA-F]{24}$/) && !offerid?.match(/^[0-9a-fA-F]{24}$/) && !offeritem1?.match(/^[0-9a-fA-F]{24}$/) && !offeritem2?.match(/^[0-9a-fA-F]{24}$/))
    {
        let err= new Error('Invalid skin id');
        err.status=400;
        return next(err);
    } else {
        return next();
    }
}



exports.hasLimitExceded = rateLimit({
    windowMS: 60*1000,
    max: 3,
    handler: function(req, res, next){
        let err = new Error('Too many attempts. Please try again.');
        err.status = 429;
        next(err);
    }
})

exports.validateSignUp = [body('firstName','First Name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be an valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','Password must be between 8 and 64 characters.').isLength({min:8, max:64}),
body('cpassword','Please confirm your password.').isLength({min:8, max:64})]

exports.validateLogin = [body('email', 'Email must be an valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','Password cannot be empty').notEmpty()]

exports.validateSkin = [body('category','Category cannot be empty').notEmpty().trim().escape(),
body('skin_name','Skin name cannot be empty').notEmpty().trim().escape(),
body('img','Image link cannot be empty').notEmpty().trim(),
body('desc','Skin details needs to of atleast 40 characters.').isLength({min:40}).trim().escape()]
exports.validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        })
        res.redirect('back')
    } else {
        return next();
    }
}

