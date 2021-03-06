const { pool } = require('./config/dbconnection')
const messageData = require('./messageData')
const defaultRet = {
  buyList: { success: false, list: null },
  sellList: { success: false, list: null },
  txList: { success: false, list: null },
  success: true,
  chartdata: [],
}




async function totalAsset(conn, user_idx) {
  let ret = {}
  ret.myAsset = await calcMyAsset(conn, user_idx);
  ret.lockedAsset = await calcLockAsset(conn, user_idx);
  ret.myCoin = await calcMyCoin(conn, user_idx);
  ret.lockedCoin = await calcLockCoin(conn, user_idx);
  ret.coinValue = await calcCoinValue(conn, user_idx, ret.myCoin);
  return ret;
}


// 내 총 자산 
async function calcMyAsset(conn, user_idx) {
  let ret = 0;
  const assetSql = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?;`
  const assetParams = [user_idx]
  const [[myAsset]] = await conn.execute(assetSql, assetParams)
  if (myAsset.asset != undefined) ret = +myAsset.asset;
  return ret;
}

// 예약에 묶여 있는 내 자산 
async function calcLockAsset(conn, user_idx) {
  const BuyOrderSql = `SELECT leftover,price FROM order_list WHERE user_idx = ?  AND order_type = 0 AND del=0;`;
  const BuyOrderParams = [user_idx];
  const [preBuyOrder] = await conn.execute(BuyOrderSql, BuyOrderParams)
  const LockedAsset = preBuyOrder.reduce((r, v) => { return r + (v.leftover * v.price) }, 0);
  return LockedAsset;
}


async function calcMyCoin(conn, user_idx) {
  let ret = 0;
  const hasCoinSql = `SELECT SUM(c_input)-SUM(c_output) as coin from coin WHERE user_idx = ?;`
  const hasCoinParams = [user_idx];
  const [[myCoin]] = await conn.execute(hasCoinSql, hasCoinParams)
  if (myCoin.coin != undefined) ret = +myCoin.coin;
  return ret
}


async function calcLockCoin(conn, user_idx) {
  let ret = 0;
  const SellOrderSql = `SELECT SUM(leftover) as leftover FROM order_list WHERE user_idx = ? AND order_type = 1 AND del=0;`;
  const SellOrderParams = [user_idx];
  const [[preSellOrder]] = await conn.execute(SellOrderSql, SellOrderParams);
  if (preSellOrder.leftover != undefined) ret = +preSellOrder.leftover;
  return ret;
}

async function calcCoinValue(conn, user_idx, cnt) {
  let result = 0;
  const tempCoinSql = `SELECT buy_commission AS qty, tx.price
                      FROM transaction AS tx
                      LEFT JOIN order_list
                      ON tx.buy_orderid = order_list.id
                      WHERE order_list.user_idx = ?
                      ORDER BY tx_date DESC; `
  const [tx] = await conn.execute(tempCoinSql, [user_idx]);
  if (tx.length > 0) {
    let leftover = cnt;
    for (let i = 0; i < tx.length; i++) {
      let commission = tx[i];
      if (commission.qty <= leftover) {
        result += commission.qty * commission.price;
        leftover -= commission.qty;
      } else {
        result = leftover * commission.price;
        break;
      }
    }
  }
  return result
}








async function getBuyList(conn) {
  let ret = { success: false, list: null };
  try {
    const buyListSql = `
        SELECT price,sum(leftover) AS leftover 
        FROM order_list 
        WHERE order_type=0 AND leftover>0
        GROUP BY price
        ORDER BY price DESC
        LIMIT 5;
        `
    const [temp] = await conn.execute(buyListSql, []);
    ret.success = true;
    ret.list = temp;
  } catch (error) {
    console.log('Query Error');
    console.log(error)
    ret = messageData.errorMessage(error)
  }
  return ret;
}


async function getSellList(conn) {
  let ret = { success: false, list: null };
  try {
    const sellListSql = `
        SELECT price,sum(leftover) AS leftover 
        FROM order_list 
        WHERE order_type=1 AND leftover>0
        GROUP BY price
        ORDER BY price ASC
        LIMIT 5;
        `
    const [temp] = await conn.execute(sellListSql, []);
    ret.success = true;
    ret.list = temp.reverse();
  } catch (error) {
    console.log('Query Error');
    console.log(error)
    ret = messageData.errorMessage(error)
  }
  return ret;
}


async function getTransactionList(conn, n) {
  let ret = { success: false, list: [] };
  try {
    let transactionListSql = `
        SELECT  *
        FROM transaction
        ORDER BY id DESC
        `
    if (n == 0) transactionListSql += ';'
    else transactionListSql += `LIMIT ${n};`

    const temp = await conn.execute(transactionListSql, []);
    temp[0].forEach((v, i) => {
      temp[0][i].tx_date = temp[0][i].tx_date.toLocaleString();
    })
    ret.success = true;

    if (n == 0) ret.list = temp[0];
    else ret.list = temp[0].reverse();
  } catch (error) {
    console.log('Query Error');
    console.log(error)
    ret = messageData.errorMessage(error)
  }
  return ret;
}

async function getResult(conn, n) {  //return array
  let ret = {}
  try {
    ret.buyList = await getBuyList(conn);
    ret.sellList = await getSellList(conn);

    if (n == 0) {
      // 여기 시간 단위로 수정해야됨. 
      const allTxSql = `
        SELECT *
        FROM transaction 
        ORDER BY tx_date;
        `
      const [txList] = await conn.execute(allTxSql, []);
      if (txList.length == 0) { //사실 이런 경우는 없음. 
        ret.txList = { success: false, list: [] };
      } else {
        ret.txList = { success: true, list: txList };
        ret.chartdata = oneMinInterval(txList);
      }
    } else {
      //트랜잭션 생성될때 호출. 
      let transactionListSql = `
        SELECT  *
        FROM transaction
        ORDER BY tx_date DESC
        LIMIT ${n};
        `
      const [txtemp] = await conn.execute(transactionListSql, []);
      ret.txList = { success: true, list: txtemp.reverse() }
    }

    if (ret.txList.success) {
      ret.txList.list.forEach((v, i) => {
        ret.txList.list[i].tx_date = new Date(v.tx_date).toLocaleString();
      })
    }
    ret.success = true;
  } catch (error) {
    console.log('Query Error');
    console.log(error)
    ret = messageData.errorMessage(error)
  }
  return ret;
}




function oneMinInterval(data) {
  //x: time, y: [0:open, 1:high, 2:low, 3:close]
  let result = [{ x: data[0].tx_date, y: [data[0].price, data[0].price, data[0].price, data[0].price] }];
  let cnt = 1;
  while (cnt < data.length) {
    let preData = result[result.length - 1];
    const now = new Date(data[cnt].tx_date);
    preTime = new Date(preData.x)
    if (compareTime(preTime, now) == true) {
      preData.y[3] = data[cnt].price; //종가는 가장 마지막 거래니까 들어올때마다 갱신
      if (preData.y[1] == null || preData.y[1] < data[cnt].price) {
        preData.y[1] = data[cnt].price;
      }
      if (preData.y[2] == null || preData.y[2] > data[cnt].price) {
        preData.y[2] = data[cnt].price;
      }
      cnt++;
    } else {
      const newDate = new Date(preTime).setMinutes(preTime.getMinutes() + 1);
      const open = preData.y[3] != null ? preData.y[3] : preData.y[0];
      result.push({ x: new Date(newDate), y: [open, null, null, null] })
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




//임시 트랜잭션 데이터 생성.
async function makeTxTemp(conn) {

  const sql = `INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price,tx_date) VALUES(1,100,100,2,200,100,?,?)`
  let now = new Date();
  for (let i = 0; i < 25; i++) {
    let newDate = (new Date().setMinutes(now.getMinutes() - 50 + i));
    for (let j = 0; j < 5; j++) {
      let random = Math.random() * 1000;
      let finalDate = new Date(newDate);
      let params = [random, finalDate];
      const [temp] = await conn.execute(sql, params);
    }
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