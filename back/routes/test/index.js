const express = require('express');
const router = express.Router();
const testController = require('./test.controller');



router.post('/buy', testController.createOrderBuy)
router.post('/sell', testController.createOrderSell)


module.exports = router