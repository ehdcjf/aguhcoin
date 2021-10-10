import Head from 'next/head';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';
import TestChart from '../components/TestChart';
import styled from 'styled-components';
const Mainlogo = styled.div`
    display: flex;
    flex-direction: row;
    
`
const Maintext_logo = styled.div`
    display: flex;
    position: absolute;
    top: 70%;
    left: 6%;
    font-size: 60px;
`
const Maintext = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > h1 {
        font-size: 50px;
    }
    & >h2 {
        font-size: 28px;
    }
    & > div {
        font-size: 18px;
        margin-top: 5px;
    }
    & > p {
        font-size: 18px;
        margin-top: 10px;
    }
`
const Index = () => {
    return (
        <>
            <Head>
                <title>악어코인</title>
            </Head>
            <div>
                {/* <TestChart /> */}

                <MainLayout>


                    <Mainlogo>
                        <Image
                            src="/main.png"
                            width="500%"
                            height="500%"
                        />
                        <Maintext_logo>
                            AGUHCOIN
                        </Maintext_logo>
                        <Maintext>
                            <h1>가장 신뢰받는 디지털 자산 거래소</h1>
                            <div>안전하고 투명한 시스템으로 빠르고 편리한 거래 환경을 제공합니다.</div>
                        </Maintext>

                    </Mainlogo>
                    <Mainlogo>
                        <Image
                            src="/main2.png"
                            width="500%"
                            height="500%"
                        />
                        <Maintext>
                            <h2>악어코인</h2>
                            <p>
                                악어는 한번에 약 50개의 알을 낳습니다. 그중 절반은 태어나기도 전에 다른 동물의 먹이가 됩니다.<br />
                                또 알에서 깨어난 악어중에서 대부분이 다른 동물들의 먹이가 되고,<br />
                                1%의 악어가 간신히 성체로 성장합니다.<br />
                                그 1%의 악어가 늪을 지배합니다.<br />
                                악어코인은 생존에 생존을 거듭하여 코인시장을 지배하기위한 뜻을 품고있습니다.<br />
                            </p>
                        </Maintext>
                    </Mainlogo>
                </MainLayout>
            </div>
        </>
    );
}

export default Index;