import MainLayout from '../../components/layout/MainLayout';
import Head from 'next/head';
import LoginScreen from '../../components/LoginScreen';

const Login = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 로그인</title>
            </Head>
            <MainLayout>
                <LoginScreen />
            </MainLayout>
        </>
    );
}

export default Login;