const express = require('express');
const router = express.Router();
const userController = require('./user.controller')

router.get('/idcheck',userController.idCheck)
router.post('/join',userController.createUser)
router.post('/login',userController.loginUser)
router.post('/join',userController.createUser)
// 유저 거래내역, 미체결 내역
router.post('/txlog',userController.txHistory)
router.post('/outstandinglog', userController.outstandingLog)
module.exports = router