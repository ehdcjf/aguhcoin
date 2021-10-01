import { Router } from "next/router";
import { useEffect } from "react";
import axios from "axios";
//
export const kakaoCallback = async (dispatch, code) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/api/kakao?code=${code}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    return e;
  }
};
