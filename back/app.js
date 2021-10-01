const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500 
const dbsetting = require('./dbsetting')
// const nunjucks = require('nunjucks');
const mysql = require('mysql2')
const WebSocket = require("ws");
require('dotenv').config();

const logger = require('./logger');
const router = require('./routes');

//시퀄라이즈 걷어내기 
// const db = require('./models');
// db.sequelize.sync({force:false})
// .then(_=>{
//   console.log(`DB Connection Success`);
// })
// .catch(err=>{
//   console.log(`DB disconnection ${err}`);
// })

//DB 만들기.
dbsetting.dbinit();
app.use(morgan('dev'));

app.use(
  cors({
      origin: 'http://localhost:3001',
      credentials: true

  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.set('view engine','html');
// nunjucks.configure('views',{express:app});


app.use('/',router)

app.use((req,res,next)=>{
  const error = new Error(`${req.method} ${req.url} 정보가 없습니다.`);
  error.status = 404;
  logger.error(error.message);
  res.render('404');
})


const Server = app.listen(PORT, () => {
  console.log(`server start port ${PORT}`)
})

const webSocketServer = new ws.Server({
  server: Server,
})


let user = [];

webSocketServer.on('connection', (ws, req) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;





  ws.on('message', (data) => {
    const { type, nick } = JSON.parse(data.toString());
    //닉네임 입력하면 나빼고 모두한테 입장메시지 보내기.


    if (type == 0) {
      webSocketServer.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          //나빼고 다른 접속자들에게 
          client.send(JSON.stringify({ ...JSON.parse(data.toString()), port: ws._socket._peername.port, user: user, }));
        } else {
          //나에게 
          user.push({ nick: nick, port: ws._socket._peername.port })
          console.log(user)
          client.send(JSON.stringify({ ...JSON.parse(data.toString()), type: -1, user: user }));
        }
      })
    }
    else if (type == 1) {//브로드 캐스팅
      console.log(ws._socket._peername)
      webSocketServer.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          console.log(ws._socket._peername == client._socket._peername)
          const temp = JSON.stringify({
            ...JSON.parse(data.toString()),
            port: ws._socket._peername.port,
          })
          client.send(temp);
        }
      })
    }
    else if (type == 2) {
      webSocketServer.clients.forEach((client) => {
        if (client.readyState === ws.OPEN && (client._socket._peername.port == JSON.parse(data).target) || (client == ws)) {
          const temp = JSON.stringify({
            ...JSON.parse(data.toString()),
            port: ws._socket._peername.port,
          })
          client.send(temp);
        }
      })
    }
  })

  ws.on('close', () => {
    const dltuser = user.filter(v => v.port == ws._socket._peername.port)[0]
    let nick;
    if (dltuser != undefined) {
      nick = dltuser.nick;
    }
    const port = ws._socket._peername.port;
    user = user.filter(v => v.port != ws._socket._peername.port)
    webSocketServer.clients.forEach((client) => {
      client.send(JSON.stringify({ port: port, nick: nick, type: 3 }));
    })
  })
})
