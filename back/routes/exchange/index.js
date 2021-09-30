const express = require('express');
const router = express.Router();
const exchangeController = require('./exchange.controller');



router.post('/',exchangeController.createOrder)


module.exports = router