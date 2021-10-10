import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import MyCoinAsset from './MyCoinAsset';
import MyCoinList from './MyCoinList';

const NoResult = styled.div`
    width: 100%;
    height: 100%;
    padding: 130px;
    font-size: 20px;
    font-weight: lighter;
    text-align: center;
`

const MyCoin = () => {
    const [exist, setExist] = useState(true);

    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <MyCoinAsset />
            {
                exist
                ? <MyCoinList />
                : <NoResult>보유 코인이 없습니다.</NoResult>
            }
        </>
    );
}

export default MyCoin;