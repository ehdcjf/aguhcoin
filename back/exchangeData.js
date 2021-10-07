const { pool } = require('./config/dbconnection')
const messageData = require('./messageData')
const defaultRet = {
  type: 'exchange',
  buyList: { success: null, list: null },
  sellList: { success: null, list: null },
  txList: { success: null, list: null },
  success: true,
  chartdata: [],
}



async function totalAsset(data) {
  let ret = {
    type: 'totalAsset',
    success: false,
    myAsset: 0,
    lockedAsset: 0,
    availableAsset: 0,
    myCoin: 0,
    lockedCoin: 0,
    availableCoin: 0
  }
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {

      const myAsset = calcMyAsset(connection, data);
      const LockedAsset = calcLockAsset(connection, data);
      const availableAsset = myAsset - LockedAsset;
      const myCoin = calcLockAsset(connection, data);
      const LockedCoin = calcLockCoin(connection, data);
      const availableCoin = myCoin.coin - LockedCoin;
      ret.myAsset = myAsset;
      ret.lockedAsset = LockedAsset;
      ret.availableAsset = availableAsset;
      ret.myCoin = myCoin.coin;
      ret.lockedCoin = LockedCoin;
      ret.availableCoin = availableCoin;
      ret.success = true;
    } catch (error) {
      console.log('Query Error');
      console.log(error)
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
  } finally {
    connection.release();
  }
  return ret;
}






async function getBuyList(conn) {
  const buyListSql = `
  SELECT price,sum(leftover) AS leftover 
  FROM order_list 
  WHERE order_type=0 AND leftover>0
  GROUP BY price
  ORDER BY price DESC
  LIMIT 5;
  `

  const temp = await conn.execute(buyListSql, []);
  return temp[0]

}


async function getBuyList() {
  let ret = { ...defaultRet };
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      const buyListSql = `
        SELECT price,sum(leftover) AS leftover 
        FROM order_list 
        WHERE order_type=0 AND leftover>0
        GROUP BY price
        ORDER BY price DESC
        LIMIT 5;
        `
      const temp = await connection.execute(buyListSql, []);
      ret.success = true;
      ret.buyList.success = true;
      ret.buyList.list = temp[0];
    } catch (error) {
      console.log('Query Error');
      console.log(error)
      ret.buyList = messageData.errorMessage(error)
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    ret.buyList = messageData.errorMessage(error);
  } finally {
    connection.release();
  }
  return ret;
}



async function getSellList() {
  let ret = { ...defaultRet };
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      const sellListSql = `
        SELECT price,sum(leftover) AS leftover 
        FROM order_list 
        WHERE order_type=1 AND leftover>0
        GROUP BY price
        ORDER BY price ASC
        LIMIT 5;
        `
      const temp = await connection.execute(sellListSql, []);
      ret.success = true;
      ret.sellList.success = true;
      ret.sellList.list = temp[0].reverse();
    } catch (error) {
      console.log('Query Error');
      console.log(error)
      ret.sellList = messageData.errorMessage(error)
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    ret.sellList = messageData.errorMessage(error);
  } finally {
    connection.release();
  }
  return ret;
}


async function getTransactionList(n) {
  let ret = { ...defaultRet };
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      const transactionListSql = `
        SELECT  *
        FROM transaction
        ORDER BY id DESC
        LIMIT ${n};
        `
      const temp = await connection.execute(transactionListSql, []);
      temp[0].forEach((v, i) => {
        temp[0][i].tx_date = temp[0][i].tx_date.toLocaleString();
      })
      ret.success = true;
      ret.txList.success = true;
      ret.txList.list = temp[0];
    } catch (error) {
      console.log('Query Error');
      console.log(error)
      ret.txList = messageData.errorMessage(error)
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    ret.txList = messageData.errorMessage(error);
  } finally {
    connection.release();
  }
  return ret;
}

///고가 저가 시가 종가 뽑는 것도 만들어야되나? 
// 그건 내일 api 명세 보고 결정. 



async function getResult(n) {  //return array
  let ret = { ...defaultRet };
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {

      const buyListSql = `
      SELECT price,sum(leftover) AS leftover 
      FROM order_list 
      WHERE order_type=0 AND leftover>0
      GROUP BY price
      ORDER BY price DESC
      LIMIT 5;
      `
      const buytemp = await connection.execute(buyListSql, []);
      ret.buyList.success = true;
      ret.buyList.list = buytemp[0];


      const sellListSql = `
        SELECT price,sum(leftover) AS leftover 
        FROM order_list 
        WHERE order_type=1 AND leftover>0
        GROUP BY price
        ORDER BY price ASC
        LIMIT 5;
        `
      const selltemp = await connection.execute(sellListSql, []);
      ret.sellList.success = true;
      ret.sellList.list = selltemp[0].reverse();

      // //가짜 트랜잭션 데이터 
      // await makeTxTemp(connection);
      ret.chartdata = await oneMinuteInterval(connection);




      let transactionListSql = `
        SELECT  *
        FROM transaction
        ORDER BY tx_date DESC
        LIMIT 100;
        `
      if (n == 0) transactionListSql += ';'   //전체 트랜잭션 조회
      else transactionListSql += ` LIMIT ${n};` //최근 n개 트랜잭션 조회

      const txtemp = await connection.execute(transactionListSql, []);
      txtemp[0].forEach((v, i) => {
        txtemp[0][i].tx_date = txtemp[0][i].tx_date.toLocaleString();
      })
      ret.txList.success = true;
      ret.txList.list = txtemp[0];

    } catch (error) {
      console.log('Query Error');
      console.log(error)
      ret = messageData.errorMessage(error)
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    ret = messageData.errorMessage(error);
  } finally {
    connection.release();
  }
  return ret;
}


async function calcMyAsset(conn, user_idx) {
  const assetSql = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?`
  const assetParams = [user_idx]
  const [[myAsset]] = await conn.execute(assetSql, assetParams)
  return +myAsset.asset;
}

async function calcLockAsset(conn, user_idx) {
  const BuyOrderSql = `SELECT leftover,price FROM order_list WHERE user_idx = ?  AND order_type = 0 AND del=0;`;
  const BuyOrderParams = [user_idx];
  const [preBuyOrder] = await conn.execute(BuyOrderSql, BuyOrderParams)
  const LockedAsset = preBuyOrder.reduce((r, v) => { return r + (v.leftover * v.price) }, 0);
  return LockedAsset;
}


async function calcMyCoin(conn, user_idx) {
  const hasCoinSql = `SELECT SUM(c_input)-SUM(c_output) as coin from coin WHERE user_idx = ?`
  const hasCoinParams = [user_idx];
  const [[myCoin]] = await conn.execute(hasCoinSql, hasCoinParams)
  return +myCoin.coin
}

//이전 주문 목록에서 내가 매도한 코인이 있는지? 있다면 그건 판매할 수 없는 코인.

async function calcLockCoin(conn, user_idx) {

  const SellOrderSql = `SELECT SUM(leftover) as leftover FROM order_list WHERE user_idx = ? AND order_type = 1 AND del=0`;
  const SellOrderParams = [user_idx];
  const [[preSellOrder]] = await conn.execute(SellOrderSql, SellOrderParams);
  const LockedCoin = +preSellOrder.leftover;
  return LockedCoin;
}




async function oneMinuteInterval(conn) {

  const allTxSql = `
  SELECT price,tx_date 
  FROM transaction 
  ORDER BY tx_date;
  `
  const [temp] = await conn.execute(allTxSql, []);
  if (temp.length == 0) return [];
  //x: time, y: [0:open, 1:high, 2:low, 3:close]
  let result = [{ x: temp[0].tx_date, y: [temp[0].price, temp[0].price, temp[0].price, temp[0].price] }];
  let cnt = 1;
  console.log(temp)
  while (cnt < temp.length) {
    let preData = result[result.length - 1];
    const now = new Date(temp[cnt].tx_date);
    preTime = new Date(preData.x)
    if (compareTime(preTime, now) == true) {
      preData.y[3] = temp[cnt].price; //종가는 가장 마지막 거래니까 들어올때마다 갱신
      if (preData.y[1] == null || preData.y[1] < temp[cnt].price) {
        preData.y[1] = temp[cnt].price;
      }
      if (preData.y[2] == null || preData.y[2] > temp[cnt].price) {
        preData.y[2] = temp[cnt].price;
      }
      cnt++;
    } else {
      const newDate = new Date(preTime).setMinutes(preTime.getMinutes() + 1);
      result.push({ x: new Date(newDate), y: [preData.y[3], null, null, null] })
    }
  }
  return result;
}


function compareTime(pre, now) {
  const preDate = new Date(pre);
  const nowDate = new Date(now);

  if (preDate.getFullYear() == nowDate.getFullYear()
    && preDate.getMonth() == nowDate.getMonth()
    && preDate.getDate() == nowDate.getDate()
    && preDate.getHours() == nowDate.getHours()
    && preDate.getMinutes() == nowDate.getMinutes()
  ) {

    return true;
  }
  return false;
}



//가라데이터 넣기 위한 함수. 추후 정교하게 수정 필요.
async function makeTxTemp(conn) {

  const sql = `INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price,tx_date) VALUES(1,100,100,2,200,100,?,?)`
  let now = new Date();
  for (let i = 0; i < 100; i++) {
    let random = Math.random() * 1000;
    let newDate = (new Date().setMinutes(now.getMinutes() - 50 + i));
    let finalDate = new Date(newDate);
    let params = [random, finalDate];

    const [temp] = await conn.execute(sql, params);
  }
}




module.exports = {
  getResult,
  getBuyList,
  getSellList,
  getTransactionList,
  calcMyAsset,
  calcMyCoin,
  calcLockAsset,
  calcLockCoin,
  totalAsset
}