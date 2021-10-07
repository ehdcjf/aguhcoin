import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const Logo = styled.div`
    display: flex;
    width: 10%;
    margin: 0 auto;
    align-items: center;
    /* LOGO 이미지로 변경 시 background까지 삭제 */
    & > div {
        position: absolute;
        color: #000;
        font-weight: bold;
        text-decoration: none;
        margin: 0 auto;
        cursor: pointer;
    }
`

const HeaderLogo = () => {
    return (
        <Logo>
            <div>
                <Link href="/">
                    {/* <a>Logo</a> */}
                    <Image
                        src="/LOGO_Reflection_152x64.png"
                        width="180%"
                        height="70%"
                        // layout="fill"
                    />
                </Link>
            </div>
        </Logo>
    );
}

export default HeaderLogo;