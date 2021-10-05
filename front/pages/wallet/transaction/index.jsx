
import MainLayout from '../../../components/layout/MainLayout';
import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import TransitionButton from '../../../components/TransitionButton';
import TransitionList from '../../../components/TransitionList';

const TransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 2px solid #eee;

    & > div {
        display: flex;
    }
    & > div:nth-child(2) {
        flex-direction: column;
    }
`

const NoResult = styled.div`
    width: 100%;
    height: 100%;
    padding: 200px;
    font-size: 20px;
    font-weight: lighter;
    text-align: center;
    border-top: 2px solid #eee;
`

const Transaction = () => {
    const [exist, setExist] = useState(true);

    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <MainLayout>
                <WalletLayout>
                    <TransactionContainer>
                        <TransitionButton />
                        {
                            exist
                            ? <TransitionList />
                            : <NoResult>검색 결과가 없습니다.</NoResult>
                        }
                    </TransactionContainer>
                </WalletLayout>
            </MainLayout>
        </>
    );
}

export default Transaction;