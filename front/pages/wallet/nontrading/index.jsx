import MainLayout from '../../../components/layout/MainLayout';
import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import styled from 'styled-components';
import NonTradingList from '../../../components/NonTradingList';
import { useState } from 'react';

const NoResult = styled.div`
    width: 100%;
    height: 100%;
    padding: 250px;
    font-size: 20px;
    font-weight: lighter;
    text-align: center;
`

const NonTrading = () => {
    const [exist, setExist] = useState(true);

    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <MainLayout>
                <WalletLayout>
                    {
                        exist
                            ? <NonTradingList />
                            : <NoResult>미체결 내역이 없습니다.</NoResult>
                    }
                </WalletLayout>
            </MainLayout>
        </>
    );
}

export default NonTrading;