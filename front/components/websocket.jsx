import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector,useDispatch } from "react-redux";
import {ChartData_SUCCESS} from '../reducers/test'

const WebSocketWrap = ({ children }) => {

  useEffect(()=>{})
  const {socketUrl} = useSelector(state=>state.test);
  const messageHistory = useRef([]);
  const dispatch = useDispatch(); 

  
  const { sendMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);


  useEffect(() => {
    if (lastJsonMessage != null) {
      console.log(lastJsonMessage); // 여기서 객체로 받아옴. 이걸처리해주면됨. 받아서 리덕스나? 뭐 컨텍스트 업데이트해주면됨.
      
      dispatch(ChartData_SUCCESS(lastJsonMessage.chartdata))   
    }
  
  }, [lastJsonMessage]);

  // useMemo(() => {
  
  // }, [lastJsonMessage]);

  //   const connectionStatus = {
  //     [ReadyState.CONNECTING]: "Connecting",
  //     [ReadyState.OPEN]: "Open",
  //     [ReadyState.CLOSING]: "Closing",
  //     [ReadyState.CLOSED]: "Closed",
  //     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  //   }[readyState];

  return <>{children}</>;
};

export default WebSocketWrap;
