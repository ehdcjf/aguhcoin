const { id, type, price, amount, sum, userpoint, usercoin, useraddress } = req.body.data;
   if (type == 1) {
        // 수정해야함
        const result = await client.query('SELECT * FROM sellbuy where id NOT IN(?) and sellbuy = 0 and price = ? order by date asc;', [id, price]);
        if (result[0] == undefined) {
            await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
                id,
                type,
                price,
                amount,
                sum,
                useraddress,
            ]);
            const leftcoin = usercoin - amount;
            await client.query('update users set have_yama = ? where id =?', [leftcoin, id]);
            const results = await client.query('select * from users where id=?', [id]);
            res.send({ success: true, users: results[0] });
        } else {
            if (amount == result[0].amount) {
                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
                await client.query('DELETE FROM sellbuy WHERE sellbuy= 0 and id=? and date=?', [result[0].id, date]);
                const buyres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
                let sellUserPoint = userpoint + sum;
                let sellUserCoin = usercoin - amount;
                let buyUserCoin = buyres[0].have_yama + amount;
                await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                    id,
                    buyres[0].id,
                    price,
                    amount,
                    sum,
                ]);
                await client.query('UPDATE users SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                await client.query('UPDATE users SET have_yama=? where id=?', [buyUserCoin, result[0].id]);
                await client.query('insert into yamacoin (price) value (?)',[price]);
                const results = await client.query('select * from users where id=?', [id]);
                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                var options = {
                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                    method: 'POST',
                    headers: headers,
                    body: dataString,
                };
                callback = (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const data = JSON.parse(body);
                        console.log('성공');
                        res.send({ success: true, users: results[0], data: data });
                    }
                };
                request(options, callback);
            } else if (amount < result[0].amount) {
                let leftamount = result[0].amount - amount;
                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
                await client.query('UPDATE sellbuy SET amount=? WHERE sellbuy= 0 and id=? and date=?', [leftamount, result[0].id, date]);
                const buyres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
                let sellUserPoint = userpoint + sum;
                let sellUserCoin = usercoin - amount;
                let buyUserCoin = buyres[0].have_yama + amount;
                await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                    id,
                    buyres[0].id,
                    price,
                    amount,
                    sum,
                ]);
                await client.query('UPDATE users SET point=?,have_yama=? where id=?', [userpoint + sum, usercoin - amount, id]);
                await client.query('UPDATE users SET have_yama=? where id=?', [buyres[0].have_yama + amount, result[0].id]);
                const results = await client.query('select * from users where id=?', [id]);
                await client.query('insert into yamacoin (price) value (?)',[price]);
                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
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
                            await client.query('DELETE FROM sellbuy WHERE sellbuy = 0 and id=? and date=?', [result[i].id, date]);
                            const buyres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                            const newres = await client.query('SELECT * FROM users where id=?', [id]);
                            let sellUserPoint = newres[0].point + result[i].amount * result[i].price;
                            let sellUserCoin = newres[0].have_yama - result[i].amount;
                            let buyUserPoint = buyres[0].point - result[i].amount * result[i].price;
                            let buyUserCoin = buyres[0].have_yama + result[i].amount;
                            let ressum = result[i].amount * result[i].price;
                            await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                                id,
                                buyres[0].id,
                                price,
                                result[i].amount,
                                ressum,
                            ]);
                            await client.query('UPDATE users SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                            await client.query('UPDATE users SET have_yama=? where id=?', [buyres[0].have_yama + result[i].amount, result[i].id]);
                            leftamount = leftamount - result[i].amount;
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
                                const leftcoin = sellUserCoin - leftamount;
                                sendamount = amount - leftamount;
                                await client.query('update users set have_yama = ? where id =?', [leftcoin, id]);
                            }
                            await client.query('insert into yamacoin (price) value (?)',[price]);
                            const results = await client.query('select * from users where id=?', [id]);

                            if(sendamount == 0){
                                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                                var options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                    method: 'POST',
                                    headers: headers,
                                    body: dataString,
                                };
                                callback = (error, response, body) => {
                                    if (!error && response.statusCode == 200) {
                                        const data = JSON.parse(body);
                                        if (leftamount == 0 || (result.length - 1 == i && leftamount != 0))
                                            res.send({ success: true, users: results[0], data: data });
                                    }
                                };
                                request(options, callback);
                            }else{
                                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${sendamount}"]}`;
                                var options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                    method: 'POST',
                                    headers: headers,
                                    body: dataString,
                                };
                                callback = (error, response, body) => {
                                    if (!error && response.statusCode == 200) {
                                        const data = JSON.parse(body);
                                        if (leftamount == 0 || (result.length - 1 == i && leftamount != 0))
                                            res.send({ success: true, users: results[0], data: data });
                                    }
                                };
                                request(options, callback);
                            }
                        } else {
                            let lastamount = result[i].amount - leftamount;
                            const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                            await client.query('UPDATE sellbuy SET amount=?,sum=? WHERE sellbuy=0 and id=? and date=?', [
                                lastamount,
                                lastamount * price,
                                result[i].id,
                                date,
                            ]);
                            const buyres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                            const newres = await client.query('SELECT * FROM users where id=?', [id]);
                            let sellUserPoint = newres[0].point + leftamount * price;
                            let sellUserCoin = newres[0].have_yama - leftamount;
                            let buyUserPoint = buyres[0].point - leftamount * price;
                            let buyUserCoin = buyres[0].have_yama + leftamount;
                            let lastsum = leftamount * price;
                            await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                                id,
                                buyres[0].id,
                                price,
                                leftamount,
                                lastsum,
                            ]);
                            await client.query('UPDATE users SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                            await client.query('UPDATE users SET have_yama=? where id=?', [buyres[0].have_yama + leftamount, result[i].id]);
                            const results = await client.query('select * from users where id=?', [id]);
                            await client.query('insert into yamacoin (price) value (?)',[price]);
                            var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
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
                                    if (leftamount == 0) res.send({ success: true, users: results[0], data: data });
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
