const { pool } = require('../../config/dbconnection');
const messageData = require('../../messageData')
const ws = require('../../socket')
const exchangeData = require('../../exchangeData')
const request = require('request');
const { jwtId } = require('../../jwt')
const headers = { "Content-type": "application/json" };
const USER = process.env.RPC_USER;
const PW = process.env.RPC_PASSWORD;
const RPCPORT = process.env.RPC_PORT;
const ID_STRING = 'aguhcoin_exchange';
const url = `http://${USER}:${PW}@127.0.0.1:${RPCPORT}`
function createOptions(method, params = []) {
  const obj = { jsonrpc: "1.0", id: ID_STRING, method, params, }
  return JSON.stringify(obj)
}

//우선 내가 100원에 10개 팔기로 했는데 동시에 내가 100원에 10개 사기로 했다면. 못하게 해야되고. 
// 내가 100원에 10개 사기로 했는데, 내가 100원에 10개 팔고 있으면 그것도 막아줘야됨. 

//내가 100원에 10개 팔려고 했다면 나한테 코인이 10개 있는지 확인. 
//내가 100원에 10개 사려고 했다면 나한테 1000원이 있는지 확인. 
//createOrderBuy createOrderSell 합칠 수 있을 듯.

const getAll = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      const result = await exchangeData.getResult(connection, 0);
      res.json(result)
    } catch (error) {
      console.log('Query Error');
      console.log(error);
      res.json(messageData.errorMessage(error))
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error);
    res.json(messageData.errorMessage(error))
  } finally {
    connection.release();
  }
}



const createOrderBuy = async (req, res) => {
  const { aguhToken } = req.cookies;
  const idx = jwtId(aguhToken)
  const { user_idx } = req.body;
  let { qty, price } = req.body;
  if (idx != user_idx) {
    const data = {
      success: false,
      error: "잘못된 접근입니다."
    }
    res.json(data);
    return;
  }

  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      // 나한테 살만큼의 돈이 있는지 확인한다. 
      const assetSql = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?`
      const assetParams = [user_idx]
      const [[myAsset]] = await connection.execute(assetSql, assetParams)

      //이전 주문 목록에서 내가 주문한 게 있는지? 있다면 그건 구매에 사용할 수 없는 자산.
      const orderSql = `SELECT leftover,price FROM order_list WHERE user_idx = ?  AND order_type = 0 AND del=0 AND leftover>0;`;
      const orderParams = [user_idx];
      const [preOrder] = await connection.execute(orderSql, orderParams)


      const preSum = preOrder.length > 0 ? preOrder.reduce((r, v) => { return r + (v.leftover * v.price) }, 0) : 0
      const available = myAsset.asset - preSum;

      if ((qty * price) > available) {
        // 구매 못할 때. 
        const data = {
          totalAsset: myAsset.myAsset,
          reservation: preSum,
        }
        res.json(messageData.notEnoughAsset(data));
      } else {
        // 구매할 수 있다면
        const myAddressSql = `SELECT user_wallet FROM user where id=?`
        const myAddressParams = [user_idx];
        const [[myAddressResult]] = await connection.execute(myAddressSql, myAddressParams);
        const myAddress = myAddressResult.user_wallet;


        const insertOrderSql = `
        INSERT INTO order_list (user_idx, qty, price, leftover, order_type) VALUES (?,?,?,?,?);`;
        const insertOrderParams = [user_idx, qty, price, qty, 0];
        const [orderResult] = await connection.execute(insertOrderSql, insertOrderParams)
        const nowOrderIndex = orderResult.insertId;

        //거래 가능한 주문의 목록을 가져온다. 가격 - 시간 - 물량 순으로 정렬. 
        const availableOrderSql = `
          SELECT *
          FROM order_list 
          LEFT JOIN user as user
          ON order_list.user_idx = user.id
          WHERE user_idx NOT IN(?) AND price<=? AND leftover>0 AND order_type=1 AND del=0
          ORDER BY price ASC, order_date ASC, qty DESC;
        `
        const availableOrderParams = [user_idx, price];
        const [availableOrder] = await connection.execute(availableOrderSql, availableOrderParams);
        if (availableOrder.length == 0) {
          // const UNLOCKSQL = `UNLOCK TABLES;`
          // await connection.query(UNLOCKSQL)
          const result = await exchangeData.getBuyList(connection)
          const data = {
            success: true,
            buyList: result,
          }
          ws.broadcast(data);
          res.json(messageData.addOrder({ asset_result: qty * price }))
        } else {
          let cnt = 0;
          let updateSQL = ''
          let insertSQL = ''
          for (let i = 0; i < availableOrder.length; i++) {
            const order = availableOrder[i];
            const sellerLeftover = order.leftover - qty > 0 ? order.leftover - qty : 0;
            const buyerLeftover = qty - order.leftover > 0 ? qty - order.leftover : 0;
            const Asset = sellerLeftover > 0 ? qty * order.price : order.leftover * order.price;
            const Coin = sellerLeftover > 0 ? qty : order.leftover;

            updateSQL += `
            UPDATE order_list SET leftover=${sellerLeftover} WHERE id=${order.id}; 
            UPDATE order_list SET leftover=${buyerLeftover} WHERE id=${nowOrderIndex};\n`
            insertSQL += `
            INSERT INTO asset (user_idx,input,output) VALUES(${order.user_idx},${Asset},0);
            INSERT INTO coin (user_idx,c_input,c_output) VALUES(${order.user_idx},0,${Coin});
            INSERT INTO asset (user_idx,input,output) VALUES(${user_idx},0,${Asset});
            INSERT INTO coin (user_idx,c_input,c_output) VALUES(${user_idx},${Coin},0);
            INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price) 
            VALUES(${order.id},${order.leftover},${Coin},${nowOrderIndex},${qty},${Coin},${order.price});\n`

            qty -= order.leftover;
            cnt++;
            if (qty == 0) {
              break;
            }
          }
          const lastSQL = updateSQL + insertSQL
          await connection.query(lastSQL);
          ws.commission(connection, cnt);
          res.json(messageData.transaction({ asset_result: qty * price }))
        }
      }
    } catch (error) {
      console.log('Query Error');
      console.log(error);
      res.json(messageData.errorMessage(error))
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error);
    res.json(messageData.errorMessage(error))
  } finally {
    connection.release();
  }
}


const createOrderSell = async (req, res) => {
  const { aguhToken } = req.cookies;
  const idx = jwtId(aguhToken)
  const { user_idx } = req.body;
  let { qty, price } = req.body;
  if (idx != user_idx) {
    const data = {
      success: false,
      error: "잘못된 접근입니다."
    }
    res.json(data);
    return;
  }

  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {

      // 나한테 팔만큼의 코인이 있는지 확인한다. 
      const hasCoinSql = `SELECT SUM(c_input)-SUM(c_output) as coin from coin WHERE user_idx = ?`
      const hasCoinParams = [user_idx];
      const [[myCoin]] = await connection.execute(hasCoinSql, hasCoinParams)

      //이전 주문 목록에서 내가 매도한 코인이 있는지? 있다면 그건 판매할 수 없는 코인.
      const orderSql = `SELECT SUM(leftover) as leftover FROM order_list WHERE user_idx = ? AND order_type = 1 AND del=0`;
      const orderParams = [user_idx];
      const [[preOrder]] = await connection.execute(orderSql, orderParams)

      const myOrder = preOrder.leftover;
      const available = myCoin.coin - myOrder;
      if (qty > available) {

        // 판매 못할 때.
        // db 고쳐줄 필요도 없고. ws나  rpc는 필요없음. 
        res.json(messageData.notEnoughCoin());
      } else {
        // 판매할 수 있다면

        //이 트랜잭션이 진행되는 동안에 다른 트랜잭션이 진행되면 안되므로.. 
        // start transaction을 해줘야하는지? 그냥 lock 걸면되는지?,,. 
        // lock 거니까 다른 테이블도 다 lock 걸린다. 트랜잭션이 겹치는 경우는 고려하지 않겠다. 
        // const LOCKSQL = `LOCK TABLES order_list WRITE;`
        // await connection.query(LOCKSQL)


        // 주문은 시간이 매우 중요하니까 우선 빨리 DB에 넣어줘야할 것 같음. 
        const insertOrderSql = `
        INSERT INTO order_list (user_idx, qty, price, leftover, order_type) VALUES (?,?,?,?,?);`;
        const insertOrderParams = [user_idx, qty, price, qty, 1];
        const [orderResult] = await connection.execute(insertOrderSql, insertOrderParams)
        const nowOrderIndex = orderResult.insertId;

        //거래 가능한 주문의 목록을 가져온다. 가격 - 시간 - 물량 순으로 정렬. 
        const availableOrderSql = `
          SELECT *
          FROM order_list
          LEFT JOIN user as user
          ON order_list.user_idx = user.id
          WHERE user_idx NOT IN(?) AND price>=? AND leftover>0 AND order_type=0 AND del=0
          ORDER BY price DESC, order_date ASC, qty DESC;
        `
        const availableOrderParams = [user_idx, price];
        const [availableOrder] = await connection.execute(availableOrderSql, availableOrderParams);
        if (availableOrder.length == 0) {
          //가능한 거래가 없으므로 종료.
          //주문 완료에 대한 메시지
          // const UNLOCKSQL = `UNLOCK TABLES;`
          // await connection.query(UNLOCKSQL)
          const result = await exchangeData.getSellList(connection);
          const data = {
            sellList: result,
            success: true,
          }
          ws.broadcast(data);
          res.json(messageData.addOrder({ coin_result: qty }))
        } else {

          const myAccountSql = `SELECT user_id FROM user where id=?`
          const myAccountParams = [user_idx];
          const [[myAccountResult]] = await connection.execute(myAccountSql, myAccountParams);
          const myAccount = myAccountResult.user_id;

          let cnt = 0;
          for (let i = 0; i < availableOrder.length; i++) {
            const order = availableOrder[i];
            const sellerLeftover = qty - order.leftover > 0 ? qty - order.leftover : 0;
            const buyerLeftover = order.leftover - qty > 0 ? order.leftover - qty : 0;
            const Asset = sellerLeftover > 0 ? order.leftover * price : qty * price;
            const Coin = sellerLeftover > 0 ? order.leftover : qty;

            let updateSQL = '';
            let insertSQL = '';
            updateSQL += `
            UPDATE order_list SET leftover=${buyerLeftover} WHERE id=${order.id}; 
            UPDATE order_list SET leftover=${sellerLeftover} WHERE id=${nowOrderIndex};\n`
            insertSQL += `
            INSERT INTO asset (user_idx,input,output) VALUES(${order.user_idx},0,${Asset});
            INSERT INTO coin (user_idx,c_input,c_output) VALUES(${order.user_idx},${Coin},0);
            INSERT INTO asset (user_idx,input,output) VALUES(${user_idx},${Asset},0);
            INSERT INTO coin (user_idx,c_input,c_output) VALUES(${user_idx},0,${Coin});
            INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price) 
            VALUES(${nowOrderIndex},${qty},${Coin},${order.id},${order.leftover},${Coin},${price});\n`
            qty -= order.leftover;
            cnt++;
            if (qty == 0) break;
          }
          const lastSQL = updateSQL + insertSQL;
          await connection.query(lastSQL);
          // updateSQL += 'UNLOCK TABLES;'
          ws.commission(connection, cnt);
          res.json(messageData.transaction({ coin_result: qty }))
        }
      }
    } catch (error) {
      console.log('Query Error');
      console.log(error);
      res.json(messageData.errorMessage(error))
    }
  } catch (error) {
    console.log('DB Error');
    console.log(error)
    res.json(messageData.errorMessage(error))
  } finally {
    connection.release();
  }
}

const deleteOrder = async (req, res) => {
  const { order_id } = req.body;
  //쿠키에서 아이디 확인도 해야됨.
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      const orderInfoSql = `SELECT * FROM order_list WHERE id=?`
      const [result] = await connection.execute(orderInfoSql, [order_id]);
      let cancle = {
        asset_result: 0,
        cosin_result: 0
      }
      if (result.order_type == 0) {
        cancle.asset_result = -result.leftover * result.price;
      } else {
        cancle.coin_result = -result.leftover;
      }

      const transactionListSql = `UPDATE order_list SET del=1 WHERE id=?;`
      await connection.execute(transactionListSql, [order_id]);
      const data = {
        success: true,
        msg: `주문번호:${order_id}\n주문을 취소했습니다.`,
        cancle_order: cancle
      }

      const buyList = await exchangeData.getBuyList(connection);
      const sellList = await exchangeData.getSellList(connection);
      const socketData = {
        success: true,
        buyList,
        sellList,
      }
      ws.broadcast(socketData);
      res.json(data)
    } catch (error) {
      console.log('Query Error');
      console.log(error)
      res.json(messageData.errorMessage(error));
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    res.json(messageData.errorMessage(error))
  } finally {
    connection.release();
  }
}


// const garaInput = async (req, res) => {
//   let connection;
//   try {
//     connection = await pool.getConnection(async conn => conn);
//     try {
//       //가라데이터 삽입//
//       let getNow = new Date().getTime()  // 현재시간
//       let newTime = getNow - 1 * 1000 * 30
//       let newnewTime = new Date(newTime)

//       function getRandomPrice(a) {
//         let output
//         if (a < 300) {
//           while (true) {
//             output = Math.floor(Math.random() * 500)
//             if (output > 200 && output <= 300) {
//               return output
//             }
//           }
//         } else if (a >= 300 && a < 400) {
//           while (true) {
//             output = Math.floor(Math.random() * 500)
//             if (output > 300 && output <= 430) {
//               return output
//             }
//           }
//         } else {
//           while (true) {
//             output = Math.floor(Math.random() * 500)
//             if (output > 430 && output <= 500) {
//               return output
//             }
//           }
//         }
//       }

//       function getRandomAmount() {
//         let output
//         while (true) {
//           output = Math.floor(Math.random() * 10)
//           if (output > 1) {
//             return output
//           }
//         }
//       }

//       async function everyThirtySec() {
//         for (let i = 0; i < 500; i++) {
//           let newTime = getNow - i * 1000 * 30
//           let newnewTime = new Date(newTime)
//           let convertedTime = newnewTime
//           let amount = getRandomAmount()
//           let sql = `INSERT INTO transaction 
//                           (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price, tx_date, coin_id)
//                           VALUES (?,?, 10, ?, ?, 10, ?, ?, ?, 1);`
//           const [result] = await connection.execute(sql, [i + 1, amount, i + 501, amount, getRandomPrice(i), i + 1, convertedTime])
//         }
//       }
//       // everyThirtySec()
//       const [getArr] = await connection.execute(`SELECT * from transaction`)

//       //가라데이터 삽입//
//       data = {
//         success: true,
//         data: getArr
//       }
//       res.json(data);
//     } catch (error) {
//       console.log('Query Error');
//       console.log(error)
//       const data = {
//         success: false,
//         error: error.sqlMessage,
//       }
//       res.json(data)
//     }
//   } catch (error) {
//     console.log('DB Error')
//     console.log(error)
//     const data = {
//       success: false,
//       error: error.sqlMessage,
//     }
//     res.json(data)
//   } finally {
//     connection.release();
//   }
// }




module.exports = {
  getAll,
  createOrderBuy,
  createOrderSell,
  deleteOrder,
  // garaInput
}