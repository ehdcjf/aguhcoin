import Link from 'next/link';
import styled from 'styled-components';

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
    background: crimson;
`

const HeaderLogo = () => {
    return (
        <Logo>
            <div>
                <Link href="/">
                    <a>Logo</a>
                </Link>
            </div>
        </Logo>
    );
}

export default HeaderLogo;