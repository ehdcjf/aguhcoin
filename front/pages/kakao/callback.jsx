import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoCallback } from "../../components/api/kakaoCallback";
// import Store from "../store/context";
import Router from "next/router";
import { UserLoginAction } from "../../reducers/user";

const KakaoLogin = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const result = await kakaoCallback(dispatch, code);

    if (!result.success) {
      Router.push(`/user/join?id=${result.kakao_code}`);
    } else {
      dispatch(UserLoginAction(result));
      Router.push(`/`);
    }
  }, []);

  return (
    <>
      <span>카카오 로그인 중입니다.</span>
    </>
  );
};

export default KakaoLogin;
