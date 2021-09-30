const express = require('express');
const router = express.Router();
const userController = require('./user.controller')

router.get('/idcheck',userController.idCheck)
router.post('/join',userController.createUser)
router.post('/login',userController.loginUser)
router.post('/join',userController.createUser)

module.exports = router