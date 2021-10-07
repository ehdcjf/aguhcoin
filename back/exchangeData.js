const {pool} = require('./config/dbconnection')
const messageData = require('./messageData')
const defaultRet = {
  type:'exchange',
  buyList: { success: null, list: null },
  sellList: { success: null, list: null },
  txList: { success: null, list: null },
  success: true,
  chartdata:[],
}


// 가격 상위 매수 목록 5개를 뿌려줌. 
// 그런데 매수 목록이 없다면? 없다고 알려줘야함
// length ==0 이면 매수물량이 없다고 알려줘야함.
// 이건 프론트에서 처리하자. 
// success가 true인데  list값이 없으면 매수물량이 없습니다. 
// success가 flase면..  error 메세지로 알려주기. 
// 쿼리문 에러는 쿼리를 잘 짰으면 발생할 이유가 없음. 
// DB 조회시 오류가 발생했다면 그것도 알려줘야함. 목록이 없는 게 아니라. 오류라는

async function totalAsset(data){
  let ret = {
    type:'totalAsset',
    success:true,
    myAsset:0,
    lockedAsset:0,
    availableAsset:0,
    myCoin:0,
    lockedCoin:0,
    availableCoin:0
     

  }
  let connection;
  try {
    connection = await pool.getConnection(async conn => conn);
    try {
      const assetSql = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?`
      const assetParams = [data]
      const [[myAsset]] = await connection.execute(assetSql, assetParams)
      
      const BuyOrderSql = `SELECT leftover,price FROM order_list WHERE user_idx = ?  AND order_type = 0 AND del=0;`;
      const BuyOrderParams = [data];
      const [preBuyOrder] = await connection.execute(BuyOrderSql, BuyOrderParams)
      
      const LockedAsset =preBuyOrder.reduce((r,v)=>{return r+(v.leftover*v.price)},0);
      const availableAsset = +myAsset.asset - LockedAsset;
      ret.myAsset = +myAsset.asset;
      ret.lockedAsset = LockedAsset;
      ret.availableAsset = availableAsset;

      const hasCoinSql = `SELECT SUM(c_input)-SUM(c_output) as coin from coin WHERE user_idx = ?`
      const hasCoinParams = [data];
      const [[myCoin]] = await connection.execute(hasCoinSql, hasCoinParams)

      //이전 주문 목록에서 내가 매도한 코인이 있는지? 있다면 그건 판매할 수 없는 코인.
      const SellOrderSql = `SELECT SUM(leftover) as leftover FROM order_list WHERE user_idx = ? AND order_type = 1 AND del=0`;
      const SellOrderParams = [data];
      const [[preSellOrder]] = await connection.execute(SellOrderSql, SellOrderParams)
      const LockedCoin = +preSellOrder.leftover;
      const availableCoin = myCoin.coin - LockedCoin;

      ret.myCoin = myCoin.coin;
      ret.lockedCoin = LockedCoin;
      ret.availableCoin = availableCoin;
    } catch (error) {
      console.log('Query Error');
      console.log(error)
      ret.success=false;
    }
  } catch (error) {
    console.log('DB Error')
    console.log(error)
    ret.success=false;
  } finally {
    connection.release();
  }
  return ret;
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
        `
      if(n==0) transactionListSql+=';'   //전체 트랜잭션 조회
      else transactionListSql+=` LIMIT ${n};` //최근 n개 트랜잭션 조회

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


async function clacMyAsset(conn,user_idx){
  const assetSql = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?`
  const assetParams = [user_idx]
  const [[myAsset]] = await conn.execute(assetSql, assetParams)
  return myAsset.asset;
}


async function oneMinuteInterval(conn){

  const allTxSql = `
  SELECT price,tx_date 
  FROM transaction 
  ORDER BY tx_date ;
  `

  const [temp] = await conn.execute(allTxSql, []);
  if(temp.length==0) return [];

  let result = [{time:temp[0].tx_date, low:temp[0].price,start:temp[0].price,end:temp[0].price,high:temp[0].price}];
  let cnt = 1;



  while(cnt<temp.length){
    let preData = result[result.length-1];
    const now = new Date(temp[cnt].tx_date);
    preTime = new Date(preData.time)
    if(compareTime(preTime,now)==true){
      preData.end = temp[cnt].price;
      if(preData.high==null){
        preData.high = temp[cnt].price;
      }
      if(preData.low==null){
        preData.low = temp[cnt].price;
      }
      if(preData.high<temp[cnt].price){
        preData.low = temp[cnt].price;
      }
      if(preData.low>temp[cnt].price){
        preData.low = temp[cnt].price;
      }
      cnt++;
    }else{
      const newDate = new Date(preTime).setMinutes(preTime.getMinutes()+1);
      result.push({time:new Date(newDate),low:null,start:preData.end,end:preData.end,high:null })
    }
   }
   const arrResult = result.map(v=>Object.entries(v).map(x=>x[1]));
   return arrResult;

}


function compareTime(pre,now){
  const preDate = new Date(pre);
  const nowDate = new Date(now);

  // console.log('==='+preDate+'     '+nowDate+'===')
  

  if(preDate.getFullYear()==nowDate.getFullYear()
    &&preDate.getMonth()==nowDate.getMonth()
    &&preDate.getDate()==nowDate.getDate()
    &&preDate.getHours()==nowDate.getHours()
    &&preDate.getMinutes()==nowDate.getMinutes()
  ){
    
    return true;
  }
  return false;
}


async function makeTxTemp(conn){

  const sql = `INSERT INTO transaction (sell_orderid,sell_amount,sell_commission,buy_orderid,buy_amount,buy_commission,price,tx_date) VALUES(1,100,100,2,200,100,?,?)`
  let now  = new Date();
  for(let i = 0; i<100; i++){
    let random = Math.random()*1000;
    let newDate = (new Date().setMinutes(now.getMinutes()-50+i));
    let finalDate = new Date(newDate);
    let params = [random,finalDate];

    const [temp] = await conn.execute(sql, params);
  }
}




module.exports = {
  getResult,
  getBuyList,
  getSellList,
  getTransactionList,
  clacMyAsset,
  totalAsset
}