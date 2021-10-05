import MainLayout from '../../../components/layout/MainLayout';
import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import styled from 'styled-components';
import MyCoinAsset from '../../../components/MyCoinAsset';
import MyCoinList from '../../../components/MyCoinList';
import { useState } from 'react';

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
            <MainLayout>
                <WalletLayout>
                    <MyCoinAsset />
                    {
                        exist
                        ? <MyCoinList />
                        : <NoResult>보유 코인이 없습니다.</NoResult>
                    }
                </WalletLayout>
            </MainLayout>
        </>
    );
}

export default MyCoin;