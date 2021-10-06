import Link from 'next/link';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    flex-direction: row;
    width: 100%;
    padding: 20px 10%;
    background: #000;
`

const Logo = styled.div`
    display: flex;
    width: 10%;
    margin: 0 auto;
    align-items: center;
    /* LOGO 이미지로 변경 시 background까지 삭제 */
    & > div {
        color: #000;
        font-weight: bold;
        text-decoration: none;
        margin: 0 auto;
    }
    background: seagreen;
`

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    margin: 0 auto;
    padding: 20px 30px;
    & > div > a {
        margin: 0 20px;
        color: #777;
        font-weight: bold;
        text-decoration: none;
    }
    & > div > a:hover {
        color: #fff;
        transition: 0.5s;
    }
`

const Menu2 = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    margin: 0 auto;
    padding: 20px 30px;
    float: right;
    & > div {
        padding: 0px 10px;
        border-left: 1px solid;
        border-color: gray;
    }
    & > div:nth-child(3) {
        border-right: 1px solid;
        border-color: gray;
    }
    & > div > a {
        margin: 0 10px;
        color: #fff;
        font-weight: bold;
        text-decoration: none;
    }
`

const LoginComponent = () => {
    return (
        <>
            <div><Link href="/logins/login"><a>로그인</a></Link></div>
        </>
    )
}

const LogoutComponent = () => {
    return (
        <>
            <div><Link href="/logout"><a>로그아웃</a></Link></div>
        </>
    )
}

const Header = () => {
    const { IsLogin } = useSelector((state) => state.user);

    return (
        <HeaderContainer>
                <Logo>
                    <div>
                        <Link href="/">
                            <a>Logo</a>
                        </Link>
                    </div>
                </Logo>
                <Menu>
                    <div>
                        <Link href="/exchanges/exchange">
                            <a>거래소</a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/wallets/wallet">
                            <a>내 지갑</a>
                        </Link>
                    </div>
                </Menu>
                <Menu2>
                    <div><a>03시 00분</a></div>
                    {
                        IsLogin === false
                            ? <LoginComponent />
                            : <LogoutComponent />
                    }
                    <div>
                        <Link href="/joins/join">
                            <a>회원가입</a>
                        </Link>
                    </div>
                </Menu2>
            </HeaderContainer>
    )
}

export default Header;