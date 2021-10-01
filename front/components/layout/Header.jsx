import Link from "next/link";
import NavToggle from "../NavToggle";
import Styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { KAKAO_AUTH_URL, KAKAO_LOGOUT_URL } from "../api/OAuth";

const HeaderContainer = Styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding:0 5vw;
    box-sizing:border-box;
    border-bottom:1px solid #ddd;
    font-family: "Syncopate", sans-serif;
    
`;

const StyledHeader = Styled.ul`
    //모바일
    display:flex;
    flex-direction:row;
    justify-content: space-between;
  padding: 50px 0;
  font: 24px;
  letter-spacing: 1px;
  font-family: "Syncopate", sans-serif;
  color: #464646;
  font-weight: 600;
  text-transform: uppercase;
    & > li {
        margin-left:20px;
    }
    //미디어쿼리 PC내용들
    @media only screen and (max-width:768px) {
        display:none;    
    }
`;

const LoginComponent = () => {
  return (
    <>
      <li>
        <Link href={KAKAO_AUTH_URL}>
          <a>로그인/회원가입</a>
        </Link>
      </li>
    </>
  );
};

const LogoutComponent = (props) => {
  const { user_id } = useSelector((state) => state.user);
  const userinfo = `/user/${user_id}`
  return (
    <>
      <li>
        <Link href={KAKAO_LOGOUT_URL}>
          <a>로그아웃</a>
        </Link>
        <span>/</span>
        <Link href={userinfo}>
          <a>회원정보</a>
        </Link>
      </li>
    </>
  );
};

const Header = () => {
  const { IsLogin, nickname } = useSelector((state) => state.user);

  // console.log(IsLogin);

  return (
    <HeaderContainer>
      {/* 로고와 메뉴 */}
      <div>
      <Link href="/">
        <a>PRESIDENT MAKER</a>
      </Link>
      </div>
      <StyledHeader>
        <li>
          <Link href="/vote">
            <a>투표</a>
          </Link>
        </li>
        <li>
          <Link href="/board/list?type=all&rows=30&page=1">
            <a>게시판</a>
          </Link>
        </li>
        {IsLogin === false ? <LoginComponent /> : <LogoutComponent />}
      </StyledHeader>
      <NavToggle />
    </HeaderContainer>
  );
};

export default Header;
