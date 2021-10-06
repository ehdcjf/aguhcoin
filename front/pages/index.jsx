import Head from 'next/head';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';
import TestChart from '../components/TestChart';

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
                    {/* <Image
                        src="/croco1.png"
                        width="200%"
                        height="200%"
                    /> */}
                </MainLayout>
            </div>
        </>
    );
}

export default Index;