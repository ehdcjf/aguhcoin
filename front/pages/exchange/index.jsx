import Head from "next/head";
import MainLayout from "../../components/layout/MainLayout";
import Hogachang from "../../components/Hogachang";
import Chart from "../../components/Chart";
import Trading from "../../components/Trading";
import Volume from "../../components/Volume";
// import styles from '../../styles/main.module.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetExchangeAction } from "../../reducers/exchange";
import styled from "styled-components";

const Exchanges = styled.div`
.contain{
    width: 100%;
    display: flex;
    justify-content: center;
    color: black;
    background: #222;
}

.content{
    width: 1200px;
    color: black;
    display: inline-block;
}
.main_center{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
}
`
// const MainCenter = styled.div`



// `
const Exchange = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetExchangeAction());
  }, []);

  return (
    <>
      <Head>
        <title>악어코인 | 거래소</title>
      </Head>

      <MainLayout>
        <Exchanges>
          <div className="contain">
            <div className="content">
              <Chart />
              
              <div className="main_center">
                
                <Hogachang />
                <Trading />
              </div>
              
              <Volume />
            </div>
          </div>
        </Exchanges>
      </MainLayout>
    </>
  );
};

export default Exchange;
