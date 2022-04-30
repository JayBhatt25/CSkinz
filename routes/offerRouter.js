const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/validators')
const controller = require('../controllers/offerController');

router.delete('/:offer',isLoggedIn, controller.withdraw);
router.put('/:offer/accept',isLoggedIn, controller.accept);
router.put('/:offer/reject',isLoggedIn, controller.reject);
router.get('/:item1/',isLoggedIn, controller.offerstep2);
router.get('/:item1',isLoggedIn, controller.test);
router.get('/:item1/:item2',isLoggedIn, controller.offerstep3);



module.exports = router;