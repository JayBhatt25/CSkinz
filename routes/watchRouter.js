const express = require('express');
const router = express.Router();
const {isLoggedIn,validateId} = require('../middlewares/validators')
const controller = require('../controllers/watchController');

router.get('/:id',validateId,isLoggedIn,controller.addToList)
router.get('/:id/remove',validateId,isLoggedIn,controller.removeFromList)

module.exports = router;