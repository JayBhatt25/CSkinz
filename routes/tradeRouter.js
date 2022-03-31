const express = require('express');
const router = express.Router();

const controller = require('../controllers/tradeController.js')



router.get('/newTrade', controller.newTrade);

router.get('/:id', controller.trade);

router.get('/:id/edit', controller.edit);

router.post('/', controller.create);

router.delete('/:id', controller.delete);

router.put('/:id', controller.update);
router.get('/', controller.trades);

module.exports = router;