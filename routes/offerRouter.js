const express = require('express');
const router = express.Router();
const {isLoggedIn,validateId} = require('../middlewares/validators')
const controller = require('../controllers/offerController');

router.delete('/:offer',validateId,isLoggedIn, controller.withdraw);
router.put('/:offer/accept',validateId,isLoggedIn, controller.accept);
router.put('/:offer/reject',validateId,isLoggedIn, controller.reject);
router.get('/:item1/',validateId,isLoggedIn, controller.offerstep2);
router.get('/:item1',validateId,isLoggedIn, controller.test);
router.get('/:item1/:item2',validateId,isLoggedIn, controller.offerstep3);



module.exports = router;