const WebSocket = require("ws");
const wsPORT = process.env.WS_PORT || 6005
let clients = [];



function broadcast(message) {  //객체형태로 메시지 전해주기. 그럼 stringify가 알아서 변환해줌. 
  clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

function wsInit() {
  const server = new WebSocket.Server({ port: wsPORT })
  console.log(`socket start!`)
  server.on('connection', (ws) => {
    clients.push(ws);   //연결되었을 때 연결된 소켓에게 최초 정보들 보내주기. 이후에는 각 트랜잭션/오더 테이블 조작할 때마다 send
    ws.send("")
  })
}



function initMessageHandler(ws) {

  ws.on('message', (data) => {

  })




  ws.on("message", data => {
    const message = JSON.parse(data)
    switch (message.type) {
      case MessageAction.QUERY_LAST:
        write(ws, responseLastMsg())
        break;
      case MessageAction.QUERY_ALL:
        write(ws, responseBlockMsg())
        break;
      case MessageAction.RESPONSE_BLOCK:
        handleBlockResponse(message)
        break;
    }
  })
}


function initErrorHandler(ws) {
  ws.on("close", () => { closeConnection(ws) })
  ws.on("error", () => { closeConnection(ws) })
}

function closeConnection(ws) {
  console.log(`Connection close ${ws.url}`)
  clients.splice(clients.indexOf(ws), 1)
}




// const webSocketServer = new ws.Server({
//   server: Server,
// })


// let user = [];



module.exports = {
  wsInit,
}