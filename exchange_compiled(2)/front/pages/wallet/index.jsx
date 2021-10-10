import MainLayout from '../../components/layout/MainLayout';
import WalletLayout from '../../components/layout/WalletLayout';
import Head from 'next/head';
import WalletScreen from '../../components/Wallet';

const Wallet = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <MainLayout>
                <WalletLayout>
                    <WalletScreen />
                </WalletLayout>
            </MainLayout>
        </>
    );
}

export default Wallet;