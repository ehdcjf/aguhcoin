import MainLayout from '../../components/layout/MainLayout';
import WalletLayout from '../../components/layout/WalletLayout';
import Head from 'next/head';
import WalletContent from '../../components/Wallet';

const Wallet = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <MainLayout>
                <WalletLayout>
                    <WalletContent />
                </WalletLayout>
            </MainLayout>
        </>
    );
}

export default Wallet;