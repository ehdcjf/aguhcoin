import { useState } from "react"





const WebSocket = ({ children }) => {

   useState(()=>{
    const ws = new WebSocket("ws://localhost:1234/ws");
    ws.onopen = () => {
      console.log("connected!!");
    };
   },[])

    return (
        <>
            <div >
                웹소켓 시작
            </div>
            { children }
        </>
    )
}

export default WebSocket

