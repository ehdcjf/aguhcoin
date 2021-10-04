import styled from 'styled-components';

const WalletContainer = styled.div`
    display: block;
    width: 100%;
    min-height: 100vh;
    padding: 1% 10%;
    background: #222;
`

const Content = styled.div`
    width: 100%;
    height: 600px;
    color: #000;
    background: #fff;
`

const Category = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;

    & > div {
        width: 33.33%;
        height: 40px;
        text-align: center;
        line-height: 38px;
        border-bottom: 2px solid #eee;
        cursor: pointer;
    }
    & > div:hover {
        color: crimson;
        border-bottom: 3px solid crimson;
    }
`

const WalletLayout = ({children}) => {
    return (
        <>
            <WalletContainer>
                <Content>
                    <Category>
                        <div>보유코인</div>
                        <div>거래내역</div>
                        <div>미체결</div>
                    </Category>
                    {/* 이중 동적라라우터???? */}
                    {/* <Category>
                            <div>
                                <Link href="/wallet/mycoins">
                                    <a>보유코인</a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/wallet/transaction">
                                    <a>거래내역</a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/exchange">
                                    <a>미체결</a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/">
                                    <a>확인용</a>
                                </Link>
                            </div>
                        </Category> */}
                    {children}
                </Content>
            </WalletContainer>
        </>
    )
}

export default WalletLayout;