const pool = require('../../config/dbconnection');


//우선 내가 100원에 10개 팔기로 했는데 동시에 내가 100원에 10개 사기로 했다면. 못하게 해야되고. 
// 내가 100원에 10개 사기로 했는데, 내가 100원에 10개 팔고 있으면 그것도 막아줘야됨. 

//내가 100원에 10개 팔려고 했다면 나한테 코인이 10개 있는지 확인. 
//내가 100원에 10개 사려고 했다면 나한테 1000원이 있는지 확인. 

const ID_STRING = 'AguhCoin';
const headers = {
    'content-type': 'text/plain;',
};


const createOrder = async(req,res)=>{
  const {userid,qty,price,type} =req.body;

  let connection;
    
  try {
      connection = await pool.getConnection(async conn => conn);
      try {
          const sql = `INSERT INTO USER (kakao_code,nickname,hometown,residence,gender,birth,image,vote_19th) 
          values(?,?,?,?,?,?,?,?)`
          const params = [kakao, nickname, hometown, residence, gender, birth, image, vote19]
          const [result] = await connection.execute(sql, params)
          const user_id = result.insertId;

          const voteSQL = `INSERT INTO vote_result (user_id,vote_id,politician_id) value (?,?,?)`;
          const voteParams = [user_id, vote_id, vote20]
          const [vote] = await connection.execute(voteSQL, voteParams)

          const access_token = createToken(user_id)
          const data = {
              success: true,
              nickname: nickname,
              image: image,
              user_id: user_id,
          }
          res.cookie('AccessToken', access_token, { httpOnly: true, secure: true })
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
// order: sellbuy, transaction: conclusion
/*
const order = async(req,res) => {
    //매수: 0 매도: 1
    const {id, type, price, amount, sum, userpoint, usercoin, useraddress, coinid } = req.body.data
    let connection;
    if(type == 0) {
        try{
            connection = await pool.getConnection(async conn => conn);
            try{
                const sql = `SELECT * FROM order_list WHERE id NOT IN(?) AND type = 1 AND price = ? ORDER BY order_date ASC;`
                const params = [id, price]
                const [result] = await connection.execute(sql, params)
                if(result[0] == undefined){
                    const orderSql = `INSERT INTO order_list (id, type, price, amount, sum, address) VALUES (?,?,?,?,?,?)`
                    const orderParams = [id, type, price, amount, sum, useraddress]
                    const orderResult = await connection.execute(orderSql, orderParams)
                    const leftpoint = userpoint - sum;
                    const leftSql = `UPDATE user SET point = ? WHERE id = ?`
                    const leftParams = [leftpoint, id]
                    const [leftResult] = await connection.execute(leftSql, leftParams);
                    const finalResult = await connection.execute(`SELECT * FROM user WHERE id = ?`, [id])
                    res.send({success: true, user: finalResult[0]})
                } else{ 
                    if(amount == result[0].amount){
                        const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss')
                        const dupResult = await connection.execute(`DELETE FROM order_list WHERE type = 1 AND id=? AND date=?`,[result[0].id, date])
                        const sellResult = await connection.execute(`SELECT * FROM user WHERE id=?`, [result[0].id])
                        let buyUserPoint = userpoint - sum
                        let buyUserCoin = usercoin + amount
                        let sellUserPoint = sellResult[0].point + sum
                        const orderSql = `INSERT INTO transaction (a_orderid, b_orderid, price, amount, sum) VALUES (?,?,?,?,?)`
                        const orderParams = [sellResult[0].id, id, price, amount, sum]
                        const orderResult = await connection.execute(orderSql, orderParams)
                        await connection.execute(`UPDATE user SET point=?, have_yama=? where id=?`, [buyUserPoint, buyUserCoin, id]) //have_yama에 해당하는 부분이?
                        await connection.execute('UPDATE user SET point=? where id=?', [sellUserPoint, result[0].id]); //point 부분?
                        const dataResult = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
                        await connection.execute('INSERT INTO yamacoin (price) value (?)',[price]); //yamacoin table=?
                        let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
                        let options = {
                            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                            method: 'POST',
                            headers: headers,
                            body: dataString,
                        };
                        callback = (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                const data = JSON.parse(body);
                                console.log('options', options);
                                res.send({ success: true, users: dataResult[0], data: data });
                            }
                        };
                        request(options, callback);
                    } else if(amount<result[0].amount){
                        let leftover = result[0].amount - amount
                        const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss')
                        let leftResult = connection.execute(`UPDATE order_list SET amount=? WHERE type=1 AND id=? AND date=?`,[leftover, result[0].id, date])
                        const sellResult = await connection.execute(`SELECT * FROM user where id=?`, [result[0].id])
                        let buyUserPoint = userpoint - sum
                        let buyUserCoin = usercoin + amount
                        let sellUserPoint = sellResult[0].point + sum
                        const orderSql = `INSERT INTO transaction (a_orderid, b_orderid, price, amount, sum) VALUES (?,?,?,?,?)`
                        const orderParams = [sellResult[0].id, id, price, amount, sum]
                        const orderResult = await connection.execute(orderSql, orderParams)
                        await connection.execute(`UPDATE user SET point=?, have_yama=? where id=?`, [buyUserPoint, buyUserCoin, id]) //have_yama에 해당하는 부분이?
                        await connection.execute('UPDATE user SET point=? where id=?', [sellUserPoint, result[0].id]); //point 부분?
                        const dataResult = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
                        await connection.execute('INSERT INTO yamacoin (price) value (?)',[price]); //yamacoin table=?
                        let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
                        let options = {
                            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                            method: 'POST',
                            headers: headers,
                            body: dataString,
                        };
                        callback = (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                const data = JSON.parse(body);
                                console.log('options', options);
                                res.send({ success: true, users: dataResult[0], data: data });
                            }
                        };
                        request(options, callback);
                    } else {
                        let leftover = amount;
                        for(let i = 0; i< result.length; i++){
                            if(leftover>=result[i].amount){
                                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss')
                                const dupResult = await connection.execute(`DELETE FROM order_list WHERE type = 1 AND id=? AND date=?`,[result[i].id, date])
                                const sellResult = await connection.execute(`SELECT * FROM user WHERE id=?`, [result[i].id])
                                const newResult = await connection.execute(`SELECT * FROM user where id=?`, [id])
                                let resultSum = result[i].amounmt * result[i].price
                                let buyUserPoint = newResult[0].point - resultSum
                                let buyUserCoin = newResult[0].have_yama + result[i].amount
                                let sellUserPoint = sellResult[0].point + resultSum
                                leftover -= result[i].amount
                                const orderSql = `INSERT INTO transaction (a_orderid, b_orderid, price, amount, sum) VALUES (?,?,?,?,?)`
                                const orderParams = [sellResult[0].id, id, price, amount, resultSum]
                                const orderResult = await connection.execute(orderSql, orderParams)
                                await connection.execute(`UPDATE user SET point=?, have_yama=? where id=?`, [buyUserPoint, buyUserCoin, id]) //have_yama에 해당하는 부분이?
                                await connection.execute('UPDATE user SET point=? where id=?', [sellUserPoint, result[i].id]); //point 부분?
                                let sendAmount = 0
                                if(result.length - 1 == i && leftover != 0){
                                    await connection.execute('INSERT INTO order_list (id,type,price,amount,sum,address) values (?,?,?,?,?,?)', [
                                        id,
                                        type,
                                        price,
                                        leftover,
                                        price * leftover,
                                        useraddress,
                                    ]);
                                    const leftPoint = buyUserPoint - sum
                                    await connection.execute('UPDATE user SET point = ? WHERE id =?', [leftpoint, id]); //point🤔
                                    sendAmount = amount - leftover;
                                }
                                const results = await connection.execute(`SELECT * FROM user where id=?`,[id])
                                await connection.execute(`INSERT INTO yamacoin (price) value (?)`, [price])
                                if(sendAmount == 0){
                                    let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                                    let options = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                        method: 'POST',
                                        headers: headers,
                                        body: dataString,
                                    };
                                    callback = (error, response, body) => {
                                        if (!error && response.statusCode == 200) {
                                            const data = JSON.parse(body);
        
                                            if (leftover == 0 || (result.length - 1 == i && leftover != 0)) {
                                                res.send({ success: true, users: results[0], data: data });
                                            }
                                        }
                                    };
                                    request(options, callback);
                                }else{
                                    let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${sendamount}"]}`;
                                    let options = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                        method: 'POST',
                                        headers: headers,
                                        body: dataString,
                                    };
                                    callback = (error, response, body) => {
                                        if (!error && response.statusCode == 200) {
                                            const data = JSON.parse(body);
                                            if (leftover == 0 || (result.length - 1 == i && leftover != 0)) {
                                                res.send({ success: true, users: results[0], data: data });
                                            }
                                        }
                                    };
                                    request(options, callback);
                                }
                            } else{ 
                                const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                                let lastamount = result[i].amount - leftover;
                                await connection.execute(`UPDATE order_list SET amount=?,sum=? WHERE type=1 and id=? and date=?`, [
                                    lastamount,
                                    lastamount * price,
                                    result[i].id,
                                    date,
                                ]);
                                const sellResult = await connection.execute('SELECT * FROM user WHERE id=?', [result[i].id]);
                                const newResult = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
                                let buyUserPoint = newResult[0].point - leftover * price;
                                let buyUserCoin = newResult[0].have_yama + leftover;
                                let sellUserPoint = sellResult[0].point + leftover * price;
                                let sellUserCoin = sellResult[0].have_yama - leftover;
                                let lastsum = leftover * price;
                                await connection.execute('INSERT INTO transaction (a_orderid,b_orderid,price,amount,sum) VALUES (?,?,?,?,?)', [
                                    sellResult[0].id,
                                    id,
                                    price,
                                    leftover,
                                    lastsum,
                                ]);
                                await connection.execute('UPDATE user SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                                await connection.execute('UPDATE user SET point=? where id=?', [sellUserPoint, result[i].id]);
                                const results = await connection.execute('select * from user WHERE id=?', [id]);
                                await connection.execute('INSERT INTO yamacoin (price) value (?)',[price]);
                                let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                                let options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                    method: 'POST',
                                    headers: headers,
                                    body: dataString,
                                };
                                leftover = 0;
                                callback = (error, response, body) => {
                                    if (!error && response.statusCode == 200) {
                                        const data = JSON.parse(body);
                                        if (leftover == 0) {
                                            res.send({ success: true, users: results[0], data: data });
                                        }
                                    }
                                };
                                request(options, callback);
                            }
                        }
                    }
                }
            }catch(e){console.log(e)}
        } catch(e){console.log(e)}
    } else if (type == 1){
        try{
            connection = await pool.getConnection(async conn => conn);
            try{
                const sql = `SELECT * FROM order_list WHERE id NOT IN(?) AND type = 0 AND price = ? ORDER BY order_date ASC;`
                const params = [id, price]
                const [result] = await connection.execute(sql, params)
                if(result[0] == undefined){
                    const orderSql = `INSERT INTO order_list (id, type, price, amount, sum, address) VALUES (?,?,?,?,?,?)`
                    const orderParams = [id, type, price, amount, sum, useraddress]
                    const orderResult = await connection.execute(orderSql, orderParams)
                    const leftcoin = usercoin - amount;
                    const leftSql = `UPDATE user SET have_yama = ? WHERE id = ?`
                    const leftParams = [leftcoin, id]
                    const [leftResult] = await connection.execute(leftSql, leftParams);
                    const finalResult = await connection.execute(`SELECT * FROM user WHERE id = ?`, [id])
                    res.send({success: true, user: finalResult[0]})
                } else{ 
                    if(amount == result[0].amount){
                        const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss')
                        const dupResult = await connection.execute(`DELETE FROM order_list WHERE type = 0 AND id=? AND date=?`,[result[0].id, date])
                        const buyResult = await connection.execute(`SELECT * FROM user WHERE id=?`, [result[0].id])
                        let sellUserPoint = userpoint - sum
                        let sellUserCoin = usercoin + amount
                        let buyUserCoin = buyResult[0].point + sum
                        const orderSql = `INSERT INTO transaction (a_orderid, b_orderid, price, amount, sum) VALUES (?,?,?,?,?)`
                        const orderParams = [id, buyResult[0].id, price, amount, sum]
                        const orderResult = await connection.execute(orderSql, orderParams)
                        await connection.execute(`UPDATE user SET point=?, have_yama=? where id=?`, [sellUserPoint, sellUserCoin, id]) //have_yama에 해당하는 부분이?
                        await connection.execute('UPDATE user SET have_yama=? where id=?', [buyUserCoin, result[0].id]); //point 부분?
                        await connection.execute('insert into yamacoin (price) value (?)',[price]);
                        const dataResult = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
                        let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                        let options = {
                            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                            method: 'POST',
                            headers: headers,
                            body: dataString,
                        };
                        callback = (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                const data = JSON.parse(body);
                                console.log('options', options);
                                res.send({ success: true, users: dataResult[0], data: data });
                            }
                        };
                        request(options, callback);
                    } else if(amount<result[0].amount){
                        let leftover = result[0].amount - amount
                        const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss')
                        let leftResult = connection.execute(`UPDATE order_list SET amount=? WHERE type=0 AND id=? AND date=?`,[leftover, result[0].id, date])
                        const buyResult = await connection.execute(`SELECT * FROM user where id=?`, [result[0].id])
                        let sellUserPoint = userpoint + sum;
                        let sellUserCoin = usercoin - amount;
                        let buyUserCoin = buyResult[0].have_yama + amount;
                        const orderSql = `INSERT INTO transaction (a_orderid, b_orderid, price, amount, sum) VALUES (?,?,?,?,?)`
                        const orderParams = [id, buyResult[0].id, price, amount, sum]
                        const orderResult = await connection.execute(orderSql, orderParams)
                        await connection.execute(`UPDATE user SET point=?, have_yama=? where id=?`, [userpoint + sum, usercoin - amount, id]) //have_yama에 해당하는 부분이?
                        await connection.execute('UPDATE user SET point=? where id=?', [buyResult[0].have_yama + amount, result[0].id]); //point 부분?
                        const dataResult = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
                        await connection.execute('INSERT INTO yamacoin (price) value (?)',[price]); //yamacoin table=?
                        let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
                        let options = {
                            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                            method: 'POST',
                            headers: headers,
                            body: dataString,
                        };
                        callback = (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                const data = JSON.parse(body);
                                console.log('options', options);
                                res.send({ success: true, users: dataResult[0], data: data });
                            }
                        };
                        request(options, callback);
                    } else {
                        let leftover = amount;
                        for(let i = 0; i< result.length; i++){
                            if(leftover>=result[i].amount){
                                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss')
                                const dupResult = await connection.execute(`DELETE FROM order_list WHERE type = 0 AND id=? AND date=?`,[result[i].id, date])
                                const buyResult = await connection.execute(`SELECT * FROM user WHERE id=?`, [result[i].id])
                                const newResult = await connection.execute(`SELECT * FROM user where id=?`, [id])
                                let resultSum = result[i].amounmt * result[i].price
                                let sellUserPoint = newResult[0].point - resultSum
                                let sellUserCoin = newResult[0].have_yama + result[i].amount
                                let buyUserPoint = buyResult[0].point + resultSum
                                let buyUserCoin = buyResult[0].have_yama + result[i].amount
                                
                                const orderSql = `INSERT INTO transaction (a_orderid, b_orderid, price, amount, sum) VALUES (?,?,?,?,?)`
                                const orderParams = [id, buyResult[0].id, price, result[i].amount, resultSum]
                                const orderResult = await connection.execute(orderSql, orderParams)
                                await connection.execute(`UPDATE user SET point=?, have_yama=? where id=?`, [sellUserPoint, sellUserCoin, id]) //have_yama에 해당하는 부분이?
                                await connection.execute('UPDATE user SET point=? where id=?', [buyResult[0].have_yama + result[i].amount, result[i].id]); //point 부분?
                                leftover = leftover - result[i].amount
                                let sendAmount = 0
                                if(result.length - 1 == i  && leftover != 0){
                                    await connection.execute(`INSERT INTO order_list (id,type,price,amount,sum,address) values (?,?,?,?,?,?)`, [
                                        id,
                                        type,
                                        price,
                                        leftover,
                                        price * leftover,
                                        useraddress,
                                    ]);
                                    const leftCoin = sellUserCoin - leftover
                                    sendAmount = amount - leftover;
                                    await connection.execute('UPDATE user SET have_yama = ? WHERE id =?', [leftCoin, id]); //point🤔
                                }
                                const results = await connection.execute(`SELECT * FROM user where id=?`,[id])
                                await connection.execute(`INSERT INTO yamacoin (price) value (?)`, [price])
                                if(sendAmount == 0){
                                    let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                                    let options = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                        method: 'POST',
                                        headers: headers,
                                        body: dataString,
                                    };
                                    callback = (error, response, body) => {
                                        if (!error && response.statusCode == 200) {
                                            const data = JSON.parse(body);
        
                                            if (leftover == 0 || (result.length - 1 == i && leftover != 0)) {
                                                res.send({ success: true, users: results[0], data: data });
                                            }
                                        }
                                    };
                                    request(options, callback);
                                }else{
                                    let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${sendamount}"]}`;
                                    let options = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                        method: 'POST',
                                        headers: headers,
                                        body: dataString,
                                    };
                                    callback = (error, response, body) => {
                                        if (!error && response.statusCode == 200) {
                                            const data = JSON.parse(body);
                                            if (leftover == 0 || (result.length - 1 == i && leftover != 0)) {
                                                res.send({ success: true, users: results[0], data: data });
                                            }
                                        }
                                    };
                                    request(options, callback);
                                }
                            } else{ 
                                const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                                let lastamount = result[i].amount - leftover;
                                await connection.execute(`UPDATE order_list SET amount=?,sum=? WHERE type=0 and id=? and date=?`, [
                                    lastamount,
                                    lastamount * price,
                                    result[i].id,
                                    date,
                                ]);
                                const buyResult = await connection.execute('SELECT * FROM user WHERE id=?', [result[i].id]);
                                const newResult = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
                                let sellUserPoint = newResult[0].point - leftover * price;
                                let sellUserCoin = newResult[0].have_yama + leftover;
                                let buyUserPoint = buyResult[0].point - leftover * price;
                                let buyUserCoin = buyResult[0].have_yama + leftover;
                                let lastsum = leftover * price;
                                await connection.execute('INSERT INTO transaction (a_orderid,b_orderid,price,amount,sum) VALUES (?,?,?,?,?)', [
                                    id,
                                    buyResult[0].id,
                                    price,
                                    leftover,
                                    lastsum,
                                ]);
                                await connection.execute('UPDATE user SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                                await connection.execute('UPDATE user SET point=? where id=?', [buyResult[0].have_yama + leftover, result[i].id]);
                                const results = await connection.execute('select * from user WHERE id=?', [id]);
                                await connection.execute('INSERT INTO yamacoin (price) value (?)',[price]);
                                let dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                                let options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                    method: 'POST',
                                    headers: headers,
                                    body: dataString,
                                };
                                leftover = 0;
                                callback = (error, response, body) => {
                                    if (!error && response.statusCode == 200) {
                                        const data = JSON.parse(body);
                                        if (leftover == 0) {
                                            res.send({ success: true, users: results[0], data: data });
                                        }
                                    }
                                };
                                request(options, callback);
                            }
                        }
                    }
                }
            }catch(e){console.log(e)}
        } catch(e){console.log(e)}
    }
}
 */
module.exports={
  createOrder
}