import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const Index = () => {
    return (
        <>
            <Head>
                <title>악어코인</title>
            </Head>
            <div>
                {/* <TestChart /> */}
                <MainLayout>
                    메인화면
                </MainLayout>
            </div>
        </>
    );
}

export default Index;