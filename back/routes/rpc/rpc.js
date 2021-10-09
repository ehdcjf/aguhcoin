const express = require('express');
// const router = express.Router();
const request = require('request');
const logger = require('../../logger')

const USER = process.env.RPC_USER || 'hello';
const PW = process.env.RPC_PASSWORD || '1234';
const RPCPORT = process.env.RPC_PORT || 3005;
const ID_STRING = 'aguhcoin_exchange';

export const url = `http://${USER}:${PW}@127.0.0.1:${RPCPORT}`;
export const headers = { "Content-type": "application/json" };

export function createOptions(method, params = []) {
  const obj = { jsonrpc: "1.0", id: ID_STRING, method, params, }
  return JSON.stringify(obj)
}



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


