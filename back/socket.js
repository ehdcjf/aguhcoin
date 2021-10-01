const WebSocket = require("ws");
const wsPORT = process.env.WS_PORT || 6005


let sockets = [];

function broadcast(message){
  sockets.forEach( socket => {
    socket.send(JSON.stringify(message)) 
  })
}

function wsInit(){
  const server = new WebSocket.Server({port:wsPORT})
  console.log(`socket start!`)
  server.on('connection',(ws)=>{
    sockets.push(ws);
    console.log(sockets.length)
  })
}



function initMessageHandler(ws){

  ws.on('message', (data) => {
   
  })




  ws.on("message",data => {
      const message = JSON.parse(data)
      switch(message.type){
          case MessageAction.QUERY_LAST:
              write(ws,responseLastMsg()) 
          break;
          case MessageAction.QUERY_ALL:
              write(ws,responseBlockMsg())
          break;
          case MessageAction.RESPONSE_BLOCK:
              handleBlockResponse(message)
          break;
      }
  })
}


function initErrorHandler(ws){
  ws.on("close",()=>{ closeConnection(ws) })
  ws.on("error",()=>{ closeConnection(ws) })
}

function closeConnection(ws){
  console.log(`Connection close ${ws.url}`)
  sockets.splice(sockets.indexOf(ws),1)
}




// const webSocketServer = new ws.Server({
//   server: Server,
// })


// let user = [];



module.exports = {
  wsInit,
}