import '../index.css';
import Head from 'next/head';
import Store,{initalState} from '../store/context';
import {useReducer,useContext} from 'react';
import {reducer} from '../store/reducer';
import wrapper from '../store/configureStore';
import WebSocket from '../components/Websocket';

const App = ({Component}) => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;500;900&display=swap" rel="stylesheet" />
            </Head>
            <WebSocket>
                <Component />
            </WebSocket>
        </>
    );
}

export default wrapper.withRedux(App);
