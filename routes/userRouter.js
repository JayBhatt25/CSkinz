const userCont = require('../controllers/userController');
const express = require('express');
const {isLoggedIn, isGuest,hasLimitExceded, validateSignUp, validateResult, validateLogin} = require('../middlewares/validators');
const router = express.Router();

router.get('/new', isGuest,userCont.new);
router.get('/login', isGuest, userCont.login);
router.post('/new', isGuest,validateSignUp,validateResult,userCont.create);
router.post('/login', isGuest ,hasLimitExceded,validateLogin,validateResult,userCont.verify);
router.get('/logout',isLoggedIn, userCont.logout);
router.get('/profile', isLoggedIn, userCont.profile);
module.exports = router;

