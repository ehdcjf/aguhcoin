import MainLayout from '../../components/layout/MainLayout';
import Head from 'next/head';
import JoinScreen from '../../components/JoinScreen';

const Join = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 회원가입</title>
            </Head>
            <MainLayout>
                <JoinScreen />
            </MainLayout>
        </>
    );
}

export default Join;