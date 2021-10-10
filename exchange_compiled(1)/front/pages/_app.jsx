import '../index.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import WebSocket from '../components/Websocket';
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ Component }) => {
    const store = useStore((state) => state);

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;500;900&display=swap" rel="stylesheet" />
            </Head>
            <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
                <WebSocket />
                <Component />
            </PersistGate>

        </>
    );
}

export default wrapper.withRedux(App);