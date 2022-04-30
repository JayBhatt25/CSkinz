const express = require('express');
const router = express.Router();
const {isLoggedIn, isAuthor, validateId} = require('../middlewares/validators');
const controller = require('../controllers/tradeController.js')
const {validateSkin, validateResult} = require('../middlewares/validators');


router.get('/newTrade',isLoggedIn, controller.newTrade);

router.get('/:id',validateId, controller.trade);

router.get('/:id/edit',validateId, isAuthor,controller.edit);

router.post('/',isLoggedIn, validateSkin,validateResult,controller.create);

router.delete('/:id',validateId, isAuthor,controller.delete);

router.put('/:id',validateId, isAuthor,controller.update);
router.get('/', controller.trades);

module.exports = router;