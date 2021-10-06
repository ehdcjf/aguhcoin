if (type == 0) {//매수 살떄,
  const result = await client.query('SELECT * FROM sellbuy where id NOT IN(?) and sellbuy = 1 and price = ? order by date asc;', [id, price]);
  // 내가 파는게 아닌 것 중에서 가격이 내가 제시한 매수가랑 일치하는 것 중을 날짜순으로 정렬 
  if (result[0] == undefined) { // 그 결과가 없다면 
      await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
        //그냥 오더 테이블에 넣는다. 
          id,
          type,
          price,
          amount,
          sum,
          useraddress,
      ]);
      const leftpoint = userpoint - sum;
      await client.query('update users set point = ? where id =?', [leftpoint, id]);
      // 혅재 현금에서 매수예약금 제외한다. 
      const results = await client.query('select * from users where id=?', [id]);
      // 그리고 그 결과를 당사자한테만 보낸다. 
      res.send({ success: true, users: results[0] });
  } else {// 결과가 있다면 
      if (amount == result[0].amount) { //매수금 일치하고, 파는 양까지 같다면. 
          const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
          await client.query('DELETE FROM sellbuy WHERE sellbuy=1 and id=? and date=?', [result[0].id, date]); // 여기서는 배열에서 삭제하네 . 
          const sellres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
          let buyUserPoint = userpoint - sum;
          let buyUserCoin = usercoin + amount;
          let sellUserPoint = sellres[0].point + sum;
          await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
              sellres[0].id,
              id,
              price,
              amount,
              sum,
          ]);
          await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
          await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[0].id]);
          const results = await client.query('select * from users where id=?', [id]);
          await client.query('insert into yamacoin (price) value (?)',[price]);
          var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
          var options = {
              url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
              method: 'POST',
              headers: headers,
              body: dataString,
          };
          callback = (error, response, body) => {
              if (!error && response.statusCode == 200) {
                  const data = JSON.parse(body);
                  console.log('options', options);
                  res.send({ success: true, users: results[0], data: data });
              }
          };
          request(options, callback);
      } else if (amount < result[0].amount) {
          let leftamounts = result[0].amount - amount;
          const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
          await client.query('UPDATE sellbuy SET amount=? WHERE sellbuy=1 and id=? and date=?', [leftamounts, result[0].id, date]);
          const sellres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
          let buyUserPoint = userpoint - sum;
          let buyUserCoin = usercoin + amount;
          let sellUserPoint = sellres[0].point + sum;
          await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
              sellres[0].id,
              id,
              price,
              amount,
              sum,
          ]);
          await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
          await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[0].id]);
          const results = await client.query('select * from users where id=?', [id]);
          await client.query('insert into yamacoin (price) value (?)',[price]);
          var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
          var options = {
              url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
              method: 'POST',
              headers: headers,
              body: dataString,
          };
          callback = (error, response, body) => {
              if (!error && response.statusCode == 200) {
                  const data = JSON.parse(body);
                  res.send({ success: true, users: results[0], data: data });
              }
          };
          request(options, callback);
      } else {
          try {
              let leftamount = amount;
              for (let i = 0; i < result.length; i++) {
                  if (leftamount >= result[i].amount) {
                      const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                      console.log('result[i].date', date);
                      await client.query('DELETE FROM sellbuy WHERE sellbuy=1 and id= ? and date= ?', [result[i].id, date]);
                      const sellres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                      const newres = await client.query('SELECT * FROM users where id=?', [id]);
                      let buyUserPoint = newres[0].point - result[i].amount * result[i].price;
                      let buyUserCoin = newres[0].have_yama + result[i].amount;
                      let sellUserPoint = sellres[0].point + result[i].amount * result[i].price;
                      let ressum = result[i].amount * result[i].price;
                      leftamount -= result[i].amount;
                      await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                          sellres[0].id,
                          id,
                          price,
                          result[i].amount,
                          ressum,
                      ]);
                      await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                      await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[i].id]);
                      let sendamount =0;
                      if (result.length - 1 == i && leftamount != 0) {
                          console.log('result.length - 1 == i && leftamount !=0');
                          await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
                              id,
                              type,
                              price,
                              leftamount,
                              price * leftamount,
                              useraddress,
                          ]);
                          const leftpoint = buyUserPoint - sum;
                          await client.query('update users set point = ? where id =?', [leftpoint, id]);
                          sendamount = amount - leftamount;
                      }
                      const results = await client.query('select * from users where id=?', [id]);
                      /*
                          ex)
                          매수하는 사람이 만약 6개를 원하지만 판매하는 사람의 총 코인 수가 5개이면 나머지 하나가 insert 해야한다.
                          이 로직을 만들려면....
                          일단 여기까지 들어온거면 매수인이 원하는 코인 수가 총 코인 수보다 많다...
                          -> result.length -1 == i  이고 leftamount != 0이면 insert?
                      */
                          await client.query('insert into yamacoin (price) value (?)',[price]);
                          if(sendamount == 0){
                              var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                              var options = {
                                  url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                  method: 'POST',
                                  headers: headers,
                                  body: dataString,
                              };
                              callback = (error, response, body) => {
                                  if (!error && response.statusCode == 200) {
                                      const data = JSON.parse(body);
                                      console.log('leftamount', i, leftamount);
                                      console.log('여기!!!', i);
  
                                      if (leftamount == 0 || (result.length - 1 == i && leftamount != 0)) {
                                          console.log('leftamount == 0', i);
                                          res.send({ success: true, users: results[0], data: data });
                                      }
                                  }
                              };
                              request(options, callback);
                          }else{
                              var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${sendamount}"]}`;
                              var options = {
                                  url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                  method: 'POST',
                                  headers: headers,
                                  body: dataString,
                              };
                              callback = (error, response, body) => {
                                  if (!error && response.statusCode == 200) {
                                      const data = JSON.parse(body);
                                      console.log('leftamount', i, leftamount);
                                      console.log('여기!!!', i);

                                      if (leftamount == 0 || (result.length - 1 == i && leftamount != 0)) {
                                          console.log('leftamount == 0', i);
                                          res.send({ success: true, users: results[0], data: data });
                                      }
                                  }
                              };
                              request(options, callback);
                          }
                  } else {
                      console.log('남은거');
                      const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                      let lastamount = result[i].amount - leftamount;
                      await client.query('UPDATE sellbuy SET amount=?,sum=? WHERE sellbuy=1 and id=? and date=?', [
                          lastamount,
                          lastamount * price,
                          result[i].id,
                          date,
                      ]);
                      const sellres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                      const newres = await client.query('SELECT * FROM users where id=?', [id]);
                      let buyUserPoint = newres[0].point - leftamount * price;
                      let buyUserCoin = newres[0].have_yama + leftamount;
                      let sellUserPoint = sellres[0].point + leftamount * price;
                      let sellUserCoin = sellres[0].have_yama - leftamount;
                      let lastsum = leftamount * price;
                      await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                          sellres[0].id,
                          id,
                          price,
                          leftamount,
                          lastsum,
                      ]);
                      await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                      await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[i].id]);
                      const results = await client.query('select * from users where id=?', [id]);
                      console.log('여기');
                      await client.query('insert into yamacoin (price) value (?)',[price]);
                      var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                      var options = {
                          url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                          method: 'POST',
                          headers: headers,
                          body: dataString,
                      };
                      leftamount = 0;
                      callback = (error, response, body) => {
                          if (!error && response.statusCode == 200) {
                              const data = JSON.parse(body);
                              console.log('남아서 여기로', i);
                              if (leftamount == 0) {
                                  res.send({ success: true, users: results[0], data: data });
                              }
                          }
                      };
                      request(options, callback);
                  }
              }
          } catch (error) {
              console.log(error);
          }
      }
  }
} 