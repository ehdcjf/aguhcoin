import BlogLayout from '../components/BlogLayout';
import Head from 'next/head';
import Image from 'next/image';

const Index = () => {
    return (
        <>  
            <Head>
                <title>악어코인</title>
            </Head>
            <BlogLayout>
                메인화면
                <Image
                    src="/croco1.png"
                    width="500%"
                    height="500%"
                    
                />
            </BlogLayout>
        </>
    );
}

export default Index;