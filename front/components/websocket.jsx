import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";

import { UpdateExchange } from "../reducers/exchange";

const WebSocketWrap = ({ children }) => {
  const dispatch = useDispatch();
  const socketServer = process.env.REACT_APP_SORCKET_URI ||  'ws://3.34.76.79:6005'
  const { sendMessage, lastMessage, lastJsonMessage, readyState } =
    useWebSocket(socketServer);

  useEffect(() => {
    if (lastJsonMessage != null) {
      console.log("JsonMessage", lastJsonMessage); // 여기서 객체로 받아옴. 이걸처리해주면됨. 받아서 리덕스나? 뭐 컨텍스트 업데이트해주면됨.

      if (lastJsonMessage.success) {
        dispatch(UpdateExchange(lastJsonMessage));
      }
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
