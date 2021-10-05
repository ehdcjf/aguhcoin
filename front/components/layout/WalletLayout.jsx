import styled from 'styled-components';
import WalletCategory from '../WalletCategory';

const WalletContainer = styled.div`
    display: block;
    width: 100%;
    min-height: 100vh;
    padding: 1% 10%;
    background: #222;

    & > div {
        width: 100%;
        height: 600px;
        color: #000;
        background: #fff;    
    }
`

const WalletLayout = ({children}) => {
    return (
        <>
            <WalletContainer>
                <div>
                    <WalletCategory />
                    {children}
                </div>
            </WalletContainer>
        </>
    );
}

export default WalletLayout;