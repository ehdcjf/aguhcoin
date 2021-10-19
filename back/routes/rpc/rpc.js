const express = require('express');
// const router = express.Router();
const request = require('request');
const logger = require('../../logger')

const USER = process.env.RPC_USER;
const PW = process.env.RPC_PASSWORD;
const RPCPORT = process.env.RPC_PORT;
const ID_STRING = 'aguhcoin_exchange';

const url = `http://${USER}:${PW}@127.0.0.1:${RPCPORT}`;
const headers = { "Content-type": "application/json" };

function createOptions(method, params = []) {
  const obj = { jsonrpc: "1.0", id: ID_STRING, method, params, }
  return JSON.stringify(obj)
}

// const url = () => {
//   const USER = process.env.RPC_USER || 'hello';
//   const PW = process.env.RPC_PASSWORD || '1234';
//   const RPCPORT = process.env.RPC_PORT || 3005;
//   const ID_STRING = 'aguhcoin_exchange';
//   return ;
// }



// //블록개수 구하기.
// router.get('/getBlockcount', (req, res, next) => {
//   const body = createOptions('getblockcount', []);
//   const option = {
//     url,
//     method: "POST",
//     headers,
//     body
//   }
//   const callback = (error, response, data) => {
//     if (error == null && response.statusCode == 200) {
//       const body = JSON.parse(data);
//       res.json(body.result);
//     } else {
//       next();
//     }
//   }

//   request(option, callback)

// })



const body = createOptions('sendfrom', [order.user_id, myAddress, Coin]);
const option = {
  url,
  method: "POST",
  headers,
  body
}
const callback = async (error, response, data) => {
  if (error == null && response.statusCode == 200) {
    const body = JSON.parse(data);
    let txid = body.result

    const updateSQL = `
        UPDATE order_list SET leftover=${sellerLeftover} WHERE id=${order.id}; 
        UPDATE order_list SET leftover=${buyerLeftover} WHERE id=${nowOrderIndex};\n`
    const insertSQL = `
        INSERT INTO asset (user_idx,input,output) VALUES(${order.user_idx},${Asset},0);
        INSERT INTO coin (user_idx,c_input,c_output) VALUES(${order.user_idx},0,${Coin});
        INSERT INTO asset (user_idx,input,output) VALUES(${user_idx},0,${Asset});
        INSERT INTO coin (user_idx,c_input,c_output) VALUES(${user_idx},${Coin},0);
        INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price,txid) 
        VALUES(${order.id},${order.leftover},${Coin},${nowOrderIndex},${qty},${Coin},${order.price},${txid});`

    const lastSQL = updateSQL + insertSQL
    await connection.query(lastSQL);
  } else {
    flag = true;
  }
}

request(option, callback)

module.exports = {
  createOptions,
}

