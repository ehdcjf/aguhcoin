const express = require('express');
const request = require('request')
const cheerio = require('cheerio');
const { response } = require('express');
const app = express();
const port = 3800;

app.get('/', (req, res) => {
  res.send(`hello aguhcoin!`)
})

//request 사용하기 1
app.get('/naver', (req, res) => {
  //request 2개의 인자
  //request(url,callback)
  //1. url값:  'string' or object{url:} 
  //2. callback
  //callback 에는 error값과 response, data 
  request(`http://www.naver.com`, (error, response, body) => {
    console.log(error);
    let msg = 'Naver';
    if (error == null) {
      res.send('naver')
    } else {
      res.send('error')
    }
  });
})

//request 사용하기2
//url안에 객체를 넣어도됨.
//여러 옵션을 넣어준다고 생각하면 될 듯. 
app.get('/naver2', (req, res) => {
  request(`http://www.naver.com`, (error, response, data) => {
    request({ url: `http://www.naver.com`, method: 'POST', header: { "Content-type": "application/json" }, body: { "msg": `hello aguh` } }, (error, response, data))
    console.log(data);
    console.log(response.statusCode)
    if (error == null && response.statusCode == 200) {
      res.send(data)
    } else {
      res.send('error')
    }
  });
})


//크롤링
app.get('/crawling', (req, res) => {
  request(`http://www.naver.com`, (error, response, data) => {
    let $ = cheerio.load(data);
    let msg = ''
    $('.partner_box_wrap>.partner_box:nth-child(3)>a').each((index, item) => {
      console.log(item.children[0].data)
      msg += item.children[0].data + '\n'
    })
    res.send(msg)

  });
})

const USER = process.env.RPC_USER || 'hello';
const PW = process.env.RPC_PASSWORD || '1234';
const RPCPORT = process.env.RPC_PORT || 3005;


app.get('/newaddress/:account', (req, res) => {
  const { account } = req.params
  const headers = { "Content-type": "application/json" }
  const body = `{"method":"getnewaddress", "params":["${account}"]}`
  const option = {
    url: `http://${USER}:${PW}@127.0.0.1:${RPCPORT}`,
    method: 'POST',
    headers,
    body
  }
  const callback = (error, response, data) => {
    if (error == null && response.statusCode == 200) {
      const body = JSON.parse(data)
      res.send(body)
      res.render();
    } else {
      res.send(error)
    }
  }

  request(option, callback)
})




app.listen(port, () => {
  console.log(`hello port ${port}`)
})




