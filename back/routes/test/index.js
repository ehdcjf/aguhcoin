const express = require('express');
const router = express.Router();
const testController = require('./test.controller');



router.post('/', testController.createOrderBuy)


module.exports = router