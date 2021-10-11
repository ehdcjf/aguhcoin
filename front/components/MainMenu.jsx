import Link from 'next/link';
import styled from 'styled-components';

const Menu = styled.div`
    height: 100%;
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

const MainMenu = () => {
    const List = [
        {
            url: "/exchange",
            subject: "거래소",
        },
        {
            url: "/wallet",
            subject: "내 지갑",
        }
    ];

    return (
        <>
            <Menu>
                {
                    List.map((v, k) => {
                        return (
                            <div key={k}>
                                <Link href={v.url}>
                                    <a>{v.subject}</a>
                                </Link>
                            </div>
                        );
                    })
                }
            </Menu>
        </>
    );
}

export default MainMenu;