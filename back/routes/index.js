const express = require('express');
const router = express.Router();
const rpcRouter = require('./rpc/index');
const userRouter = require('./user/index');
const exchangeRouter = require('./exchange/index');

router.use('/user',userRouter); //회원
router.use('/exchange',exchangeRouter); // 
router.use('/api',rpcRouter);


module.exports = router