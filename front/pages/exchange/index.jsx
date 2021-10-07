import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import Hogachang from '../../components/Hogachang';
import Chart from '../../components/Chart';
import Trading from '../../components/Trading';
import Volume from '../../components/Volume'
// import styles from '../../styles/main.module.css'
import styles from '../../styles/Mainlayout.module.css'


const Exchange = () => {
    return(
        <>
            <Head>
                <title>악어코인 | 거래소</title>
            </Head>
            <MainLayout>
                <div className={styles.contain}>
                    <div className={styles.content}>
                        <Chart />
                        <div className={styles.main_center}>
                            <Hogachang />
                            <Trading />
                        </div>
                        <Volume />
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Exchange;