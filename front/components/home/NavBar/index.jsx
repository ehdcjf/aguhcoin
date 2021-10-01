import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { KAKAO_AUTH_URL, KAKAO_LOGOUT_URL } from "../../api/OAuth";
import Link from "next/link";
import NavToggle from "../../NavToggle";

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
  letter-spacing: 1px;
  font-family: 'ROKABold';
  font-size: 24px;
  color: #464646;
  font-weight: 600;
  text-transform: uppercase;

  @media only screen and (max-width:768px) {
        display:none;    
    }
`;



const LoginComponent = () => {
  return (
    <>
      <div>
        <Link href={KAKAO_AUTH_URL}>
          <a>로그인/회원가입</a>
        </Link>
      </div>
    </>
  );
};

const LogoutComponent = (props) => {
  const { user_id } = useSelector((state) => state.user);
  const userinfo = `/user/${user_id}`
  return (
    <>
      <div>
        <Link href={KAKAO_LOGOUT_URL}>
          <a>로그아웃</a>
        </Link>
        <span>/</span>
        <Link href={userinfo}>
          <a>내 정보</a>
        </Link>
      </div>
    </>
  );
};

const NavBar = () => {
  const { IsLogin, nickname } = useSelector((state) => state.user);

  return (
    <StyledNavbar data-scroll-section>
      <div>
        <Link href="/">
          <a>president maker</a>
        </Link>
      </div>
      <div>
        <Link href="/vote">
          <a>투표</a>
        </Link>
      </div>
      <div>
        <Link href="/board/list?type=all&rows=30&page=1">
          <a>자유게시판</a>
        </Link>
      </div>
      {IsLogin === false ? <LoginComponent /> : <LogoutComponent />}
    <NavToggle/>
    </StyledNavbar>
    
  );
};

export default NavBar;
