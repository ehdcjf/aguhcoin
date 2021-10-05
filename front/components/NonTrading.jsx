import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import NonTradingList from './NonTradingList';

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
            {
                exist
                    ? <NonTradingList />
                    : <NoResult>미체결 내역이 없습니다.</NoResult>
            }
        </>
    );
}

export default NonTrading;