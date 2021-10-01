import "../index.css";
import Head from "next/head";
import "../style/style.css";
import 'react-quill/dist/quill.snow.css'
import wrapper from "../store/configureStore";
import { CookiesProvider } from "react-cookie";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ Component }) => {
  const store = useStore((state) => state);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
      </Head>

      <CookiesProvider>
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Component />
        </PersistGate>
      </CookiesProvider>
    </>
  );
};
export default wrapper.withRedux(App);
