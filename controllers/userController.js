const user = require('../models/user')
const skins = require('../models/skin')
const offers = require('../models/offer')


exports.new = (req, res) => {
    res.render('user/new');
}

exports.create = (req, res, next) => {
    let body = req.body;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    if(password != cpassword){
        req.flash('error', 'Passwords do not match');
        res.redirect('back');
    } else {
        req.body.email = req.body.email.toLowerCase();
        let newuser = new user(body);
        newuser.save()
        .then(() => {
            res.redirect('/users/login');
        })
        .catch(err => {
            if(err.name == 'ValidationError'){
                req.flash('error', err.message);
               return res.redirect('/users/new');
            } else if(err.code == 11000){
                req.flash('error', 'Email is already in use.');
                return res.redirect('/users/new');
            }
            next(err);
        });
    }
   
}

exports.login = (req, res, next) => {
    res.render('user/login');
}

exports.verify = (req, res, next) => {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;

    user.findOne({email:email})
    .then(user => {
        if(user){
            user.comparePass(password)
            .then(result => {
                if(result){
                    req.session.user = user._id;
                    req.flash('success','Login Successful!');
                    res.redirect('/users/profile');
                    next();
                } else {
                    //console.log('Wrong password')
                    req.flash('error','Wrong Password!');
                    res.redirect('/users/login')
                }
            })
        } else {
            //console.log('Wrong Email')
            req.flash('error','Wrong Email!');
            res.redirect('/users/login')
        }
    })
    .catch(err => next(err))
}

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([user.findById(id), skins.find({owner: id}).populate('owner'),offers.find().populate('oItem').populate('oFor')])
    .then((result) => {
        let [user, trades,offers] = result;
        if(user){
            res.render('user/profile',{user, trades,offers});
        } else {
            res.redirect('/users/login');
        }
    })
    .catch(err=> next(err))
   
}

exports.logout = (req, res, next) => {
    req.session.destroy((err)=> {
        if(err){
            return next(err);
        } else {
            res.redirect('/');
        }
    })
}