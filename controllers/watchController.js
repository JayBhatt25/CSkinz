const skins = require('../models/skin');
const offer = require('../models/offer');
const skin = require('../models/skin');
const user = require('../models/user');

exports.addToList = (req, res, next) => {
    const curruser = req.session.user;
    const skinid = req.params.id;

    user.findByIdAndUpdate(curruser, {$addToSet: {watch: skinid}})
    .then(founduser => {
        res.redirect('/users/profile');
    })
    .catch(err => next(err))
}

exports.removeFromList = (req, res, next) => {
    const curruser = req.session.user;
    const skinid = req.params.id;

    user.findByIdAndUpdate(curruser, {$pull: {watch: skinid}})
    .then(founduser => {
        res.redirect('/users/profile');
    })
    .catch(err => next(err))
}