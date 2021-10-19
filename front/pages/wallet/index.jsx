import MainLayout from "../../components/layout/MainLayout";
import WalletLayout from "../../components/layout/WalletLayout";
import Head from "next/head";
import WalletScreen from "../../components/Wallet";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetExchangeAction } from "../../reducers/exchange";

const Wallet = () => {
  //   const dispatch = useDispatch();
  //   const { nowPrice } = useSelector((state) => state.exchange);
  //   useEffect(() => {
  //     if (nowPrice == 0) {
  //       dispatch(GetExchangeAction());
  //     }
  //   }, [nowPrice]);

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
};

export default Wallet;
