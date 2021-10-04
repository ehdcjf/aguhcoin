const express = require('express');
const router = express.Router();
const exchangeController = require('./exchange.controller');



router.post('/buy', exchangeController.createOrderBuy)
router.post('/sell', exchangeController.createOrderSell)
router.post('/cancle', exchangeController.deleteOrder)

module.exports = router