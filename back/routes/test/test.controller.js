const pool = require('../../config/dbconnection');
const messageData = require('./messageData')

//우선 내가 100원에 10개 팔기로 했는데 동시에 내가 100원에 10개 사기로 했다면. 못하게 해야되고. 
// 내가 100원에 10개 사기로 했는데, 내가 100원에 10개 팔고 있으면 그것도 막아줘야됨. 

//내가 100원에 10개 팔려고 했다면 나한테 코인이 10개 있는지 확인. 
//내가 100원에 10개 사려고 했다면 나한테 1000원이 있는지 확인. 


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
      const orderSql = `SELECT leftover,price FROM order_list WHERE user_idx = ? AND order_type = 0`;
      const orderParams = [user_idx];
      const [[preOrder]] = await connection.execute(orderSql, orderParams)

      const myOrder = preOrder.leftover * preOrder.price;
      const available = myAsset.asset - myOrder;

      console.log(qty * price)
      console.log(available)
      if ((qty * price) > available) {

        // 구매 못할 때.
        // db 고쳐줄 필요도 없고. ws나  rpc는 필요없음. 
        res.json(messageData.notEnoughAsset());
      } else {
        // 구매할 수 있다면

        //이 트랜잭션이 진행되는 동안에 다른 트랜잭션이 진행되면 안되므로.. 
        const LOCKSQL = `LOCK TABLES order_list WRITE;`
        await connection.query(LOCKSQL)


        //우선 빨리 DB에 넣어줘야할 것 같음.  주문은 시간이 매우 중요하니까. 
        const insertOrderSql = `
        INSERT INTO order_list (user_idx, qty, price, leftover, order_type) VALUES (?,?,?,?,?);`;
        const insertOrderParams = [user_idx, qty, price, qty, order_type];
        const [orderResult] = await connection.execute(insertOrderSql, insertOrderParams)
        const nowOrderIndex = orderResult.insertId;

        //거래 가능한 주문의 목록을 가져온다. 가격 - 시간 - 물량 순으로 정렬. 
        const availableOrderSql = `
          SELECT *
          FROM order_list
          WHERE user_idx NOT IN(?) AND price<=? AND leftover>0 AND order_type=1
          ORDER BY price ASC, order_date ASC, qty DESC;
        `
        const availableOrderParams = [user_idx, price];
        const [availableOrderResult] = await connection.execute(availableOrderSql, availableOrderParams);
        let updateSQL = ''
        let insertSQL = ''
        for (let i = 0; i < availableOrderResult.length; i++) {
          const order = availableOrderResult[i];
          const sellerLeftover = order.leftover - qty > 0 ? order.leftover - qty : 0;
          const buyerLeftover = qty - order.leftover > 0 ? qty - order.leftover : 0;
          const calcAsset = sellerLeftover > 0 ? qty * order.price : order.leftover * order.price;
          const calcCoin = sellerLeftover > 0 ? qty : order.leftover;
          //트랜잭션 RPC 진행하고 txid 값을 가져와야함. 
          updateSQL += `
              UPDATE order_list SET leftover=${sellerLeftover} WHERE id=${order.id}; 
              UPDATE order_list SET leftover=${buyerLeftover} WHERE id=${nowOrderIndex};\n`
          insertSQL += `
              INSERT INTO asset (user_idx,input,output) VALUES(${order.user_idx},${calcAsset},0);
              INSERT INTO coin (user_idx,c_input,c_output) VALUES(${order.user_idx},0,${calcCoin});
              INSERT INTO asset (user_idx,input,output) VALUES(${user_idx},0,${calcAsset});
              INSERT INTO coin (user_idx,c_input,c_output) VALUES(${user_idx},${calcCoin},0);
              INSERT INTO transaction (a_orderid,a_amount,a_commission,b_orderid,b_amount,b_commission,price) 
              VALUES(${order.id},${order.leftover},${calcCoin},${nowOrderIndex},${qty},${calcCoin},${calcAsset});\n`
          qty -= order.leftover;
          if (qty <= 0) {
            break;
          }
        }
        updateSQL += 'UNLOCK TABLES;'
        const lastSQL = updateSQL + insertSQL
        await connection.query(lastSQL);
        ////트랜잭션 완료에 대한 메시지.
        res.json({ success: true })
      }
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
  createOrderBuy
}