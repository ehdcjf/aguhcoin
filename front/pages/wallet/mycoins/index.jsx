import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import Router from 'next/router';
import styled from 'styled-components';

const MyCoinContainer = styled.div`
    color: seagreen;
    font-size: 500px;
    z-index: 1;
`
const MyCoin = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <WalletLayout>
                <MyCoinContainer>
                    어디야
                </MyCoinContainer>
            </WalletLayout>
        </>
    );
}

export default MyCoin;