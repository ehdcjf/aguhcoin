const pool = require('../../config/dbconnection');
const messageData = require('../../messageData')
const ws = require('../../socket')
const exchangeData = require('../../exchangeData')

//우선 내가 100원에 10개 팔기로 했는데 동시에 내가 100원에 10개 사기로 했다면. 못하게 해야되고. 
// 내가 100원에 10개 사기로 했는데, 내가 100원에 10개 팔고 있으면 그것도 막아줘야됨. 

//내가 100원에 10개 팔려고 했다면 나한테 코인이 10개 있는지 확인. 
//내가 100원에 10개 사려고 했다면 나한테 1000원이 있는지 확인. 
//createOrderBuy createOrderSell 합칠 수 있을 듯.



const createOrderBuy = async (req, res) => {
  const { user_idx, order_type, coin_id = 1 } = req.body;
  let { qty, price } = req.body;
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
      console.log(preOrder)
      

      const preSum = preOrder.length>0 ? preOrder.reduce((r,v)=>{return r+(v.leftover*v.price)},0) : 0
      const available = myAsset.asset - preSum;

      if ((qty * price) > available) {
        const data = {
          totalAsset:myAsset.myAsset,
          reservation: preSum,
        }

        // 구매 못할 때. db 고쳐줄 필요도 없고. ws랑  rpc도 필요없음. 
        res.json(messageData.notEnoughAsset(data));
      } else {
        // 구매할 수 있다면

        //이 트랜잭션이 진행되는 동안에 다른 트랜잭션이 진행되면 안되므로.. 
        // const LOCKSQL = `LOCK TABLES order_list WRITE;`
        // await connection.query(LOCKSQL)


        //우선 빨리 DB에 넣어줘야할 것 같음.  주문은 시간이 매우 중요하니까. 
        //그리고 주문이 있다는 거 ws로 쏴줘야함. 거래확인까지 하고 할지? 아님 지금할지 정해야됨.
        const insertOrderSql = `
        INSERT INTO order_list (user_idx, qty, price, leftover, order_type) VALUES (?,?,?,?,?);`;
        const insertOrderParams = [user_idx, qty, price, qty, order_type];
        const [orderResult] = await connection.execute(insertOrderSql, insertOrderParams)
        const nowOrderIndex = orderResult.insertId;

        //거래 가능한 주문의 목록을 가져온다. 가격 - 시간 - 물량 순으로 정렬. 
        const availableOrderSql = `
          SELECT *
          FROM order_list
          WHERE user_idx NOT IN(?) AND price<=? AND leftover>0 AND order_type=1 AND del=0
          ORDER BY price ASC, order_date ASC, qty DESC;
        `
        const availableOrderParams = [user_idx, price];
        const [availableOrder] = await connection.execute(availableOrderSql, availableOrderParams);
        if (availableOrder.length == 0) {
          //주문 완료에 대한 메시지
          const UNLOCKSQL = `UNLOCK TABLES;`
          await connection.query(UNLOCKSQL)
          ws.broadcast(await exchangeData.getBuyList())
          res.json(messageData.addOrder())
        } else {
          let updateSQL = ''
          let insertSQL = ''
          let cnt = 0;
          for (let i = 0; i < availableOrder.length; i++) {
            const order = availableOrder[i];
            const sellerLeftover = order.leftover - qty > 0 ? order.leftover - qty : 0;
            const buyerLeftover = qty - order.leftover > 0 ? qty - order.leftover : 0;
            const calcAsset = sellerLeftover > 0 ? qty * order.price : order.leftover * order.price;
            const calcCoin = sellerLeftover > 0 ? qty : order.leftover;
            //트랜잭션 RPC 진행하고 txid 값을 가져와야함. 
            //각 거래가 이루어질 때마다 ws로 계속 쏴주기? 아니면 마지막에 한번 쏴주기? 
            updateSQL += `
              UPDATE order_list SET leftover=${sellerLeftover} WHERE id=${order.id}; 
              UPDATE order_list SET leftover=${buyerLeftover} WHERE id=${nowOrderIndex};\n`
            insertSQL += `
              INSERT INTO asset (user_idx,input,output) VALUES(${order.user_idx},${calcAsset},0);
              INSERT INTO coin (user_idx,c_input,c_output) VALUES(${order.user_idx},0,${calcCoin});
              INSERT INTO asset (user_idx,input,output) VALUES(${user_idx},0,${calcAsset});
              INSERT INTO coin (user_idx,c_input,c_output) VALUES(${user_idx},${calcCoin},0);
              INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price) 
              VALUES(${order.id},${order.leftover},${calcCoin},${nowOrderIndex},${qty},${calcCoin},${order.price});\n`
            qty -= order.leftover;
            cnt++;
            if (qty <= 0) {
              break;
            }
          }
          // updateSQL += 'UNLOCK TABLES;'

          const lastSQL = updateSQL + insertSQL 
          await connection.query(lastSQL);
          ws.commission(cnt);
          res.json(messageData.transaction())
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
  console.log('sell')
  const { user_idx, order_type, coin_id = 1 } = req.body;
  let { qty, price } = req.body;
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
      console.log(myCoin+'마이코인')
      console.log(myCoin.coin+'마이코인의 코인')
      console.log(myOrder+'내가 한 주문')

      console.log(qty)
      console.log(available)
      if (qty > available) {

        // 판매 못할 때.
        // db 고쳐줄 필요도 없고. ws나  rpc는 필요없음. 
        res.json(messageData.notEnoughCoin());
      } else {
        // 판매할 수 있다면

        //이 트랜잭션이 진행되는 동안에 다른 트랜잭션이 진행되면 안되므로.. 
        // start transaction을 해줘야하는지? 그냥 lock 걸면되는지?,,. 이건 많이 생각해봐야함. 
        // const LOCKSQL = `LOCK TABLES order_list WRITE;`
        // await connection.query(LOCKSQL)


        // 주문은 시간이 매우 중요하니까 우선 빨리 DB에 넣어줘야할 것 같음. 
        //그리고 주문이 있다는 거 ws로 쏴줘야함. 거래확인까지 하고 할지? 아님 지금할지 정해야됨.
        const insertOrderSql = `
        INSERT INTO order_list (user_idx, qty, price, leftover, order_type) VALUES (?,?,?,?,?);`;
        const insertOrderParams = [user_idx, qty, price, qty, order_type];
        const [orderResult] = await connection.execute(insertOrderSql, insertOrderParams)
        const nowOrderIndex = orderResult.insertId;

        //거래 가능한 주문의 목록을 가져온다. 가격 - 시간 - 물량 순으로 정렬. 
        const availableOrderSql = `
          SELECT *
          FROM order_list
          WHERE user_idx NOT IN(?) AND price>=? AND leftover>0 AND order_type=0 AND del=0
          ORDER BY price DESC, order_date ASC, qty DESC;
        `
        const availableOrderParams = [user_idx, price];
        const [availableOrder] = await connection.execute(availableOrderSql, availableOrderParams);
        if (availableOrder.length == 0) {
          //가능한 거래가 없으므로 종료.
          //주문 완료에 대한 메시지
          const UNLOCKSQL = `UNLOCK TABLES;`
          await connection.query(UNLOCKSQL)
          ws.broadcast(await exchangeData.getSellList())
          res.json(messageData.addOrder())
        } else {
          let updateSQL = ''  // leftover를 갱신하기 위한 sql;
          let insertSQL = '' //  자산, 코인, 트랜잭션 정보를 갱신하기 위한 sql; 
          let cnt = 0;
          for (let i = 0; i < availableOrder.length; i++) {
            const order = availableOrder[i];
            const sellerLeftover = qty - order.leftover > 0 ? qty - order.leftover : 0;
            const buyerLeftover = order.leftover - qty > 0 ? order.leftover - qty : 0;
            const calcAsset = sellerLeftover > 0 ? order.leftover * price : qty * price;
            const calcCoin = sellerLeftover > 0 ? order.leftover : qty;
            //트랜잭션 RPC 진행하고 txid 값을 가져와야함. 
            //각 거래가 이루어질 때마다 ws로 계속 쏴주기? 아니면 마지막에 한번 쏴주기? 
            updateSQL += `
              UPDATE order_list SET leftover=${buyerLeftover} WHERE id=${order.id}; 
              UPDATE order_list SET leftover=${sellerLeftover} WHERE id=${nowOrderIndex};\n`
            insertSQL += `
              INSERT INTO asset (user_idx,input,output) VALUES(${order.user_idx},0,${calcAsset});
              INSERT INTO coin (user_idx,c_input,c_output) VALUES(${order.user_idx},${calcCoin},0);
              INSERT INTO asset (user_idx,input,output) VALUES(${user_idx},${calcAsset},0);
              INSERT INTO coin (user_idx,c_input,c_output) VALUES(${user_idx},0,${calcCoin});
              INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price) 
              VALUES(${nowOrderIndex},${qty},${calcCoin},${order.id},${order.leftover},${calcCoin},${price});\n`
            qty -= order.leftover;
            cnt++;
            if (qty <= 0) break;
          }
          // updateSQL += 'UNLOCK TABLES;'
          const lastSQL = updateSQL + insertSQL
          await connection.query(lastSQL);
          ws.commission(cnt);
          res.json(messageData.transaction())
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
      const transactionListSql = `UPDATE order_list SET del=1 WHERE id=?;`
      await connection.execute(transactionListSql, [order_id]);
      const data = {
        success: true,
        msg: ` 주문번호:${order_id}\n주문을 취소했습니다.`
      }
      res.json(data)
    } catch (error) {
      console.log('Query Error' );
      console.log(error)
      res.json(messageData.errorMessage(error))
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    res.json(messageData.errorMessage(error))
  } finally {
    connection.release();
  }
}


const garaInput = async (req, res) => {
  let connection; 
  try {
      connection = await pool.getConnection(async conn => conn);
      try {
          //가라데이터 삽입//
          let getNow = new Date().getTime()  // 현재시간
          let newTime =  getNow - 1*1000*30
          let newnewTime = new Date(newTime)
          console.log(newnewTime.toUTCString())
          function getRandomPrice(){
              let output
              while(true){
                  output = Math.floor(Math.random()*500)
                  if(output>1){
                      return output
                  } 
              }
          }
          
          function getRandomAmount(){
              let output
              while(true){
                  output = Math.floor(Math.random()*10)
                  if(output>1){
                      return output
                  }
              }
          }
          async function everyThirtySec(){
              for(let i = 0; i<1000; i++){
                  let newTime =  getNow - i*1000*30
                  let newnewTime = new Date(newTime)
                  let convertedTime = newnewTime
                  let amount = getRandomAmount()
                  let sql = `INSERT INTO transaction 
                             (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price,txid, tx_date, coin_id)
                             VALUES (?,?, 10, ?, ?, 10, ?, ?, ?, 1);`
                  await connection.execute(sql, [i+1, amount, i+1001, amount, getRandomPrice(), i+1, convertedTime])
              }
          }
          everyThirtySec()
          //가라데이터 삽입//
          data = {
              success: true,
          }
          res.json(data);
      } catch (error) {
          console.log('Query Error');
          console.log(error)
              const data = {
                  success: false,
                  error: error.sqlMessage,
              }
          res.json(data)
      }
  } catch (error) {
      console.log('DB Error')
      console.log(error)
      const data = {
          success: false,
          error: error.sqlMessage,
      }
      res.json(data)
  } finally {
      connection.release();
  }
}




module.exports = {
  createOrderBuy,
  createOrderSell,
  deleteOrder,
  garaInput
}