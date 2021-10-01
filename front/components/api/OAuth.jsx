const CLIENT_ID = `7c2d0d5ca1353c92a277225259c64d0c`;
const REDIRECT_URI = `http://localhost:3001/kakao/callback`;
const LOGOUT_URI = `http://localhost:3001?logout=success`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_URI}`;
