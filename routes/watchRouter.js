const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/validators')
const controller = require('../controllers/watchController');

router.get('/:id',isLoggedIn,controller.addToList)
router.get('/:id/remove',isLoggedIn,controller.removeFromList)

module.exports = router;