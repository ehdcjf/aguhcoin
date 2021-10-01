import { createWrapper } from "next-redux-wrapper"
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "../reducers"
import { persistStore } from 'redux-persist';

import thunkMiddleware from "redux-thunk"
import router from "next/router";
// import createSaga from 'redux-saga'
// import rootSaga from '../saga/index'



///from   https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist  넥스트 리덕스 퍼시스트에 도움을 준  고마운 분들^^







const loggetrMiddelware = ({ dispatch, getState }) => (next) => (action) => {
  // console.log(action); 
  // console.log(dispatch); 
  // console.log(getState);
  return next(action);
}




const configureStore = () => {
  // const sagaMiddleware = createSaga(); 

  const Store = createStore(reducer, enhancer)
  // Store.sagaTask = sagaMiddleware.run(rootSaga) 

  return Store
}

const makeStore = ({ isServer }) => {

  const middlewares = [loggetrMiddelware, thunkMiddleware];
  // const middlewares = [sagaMiddleware]; 
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

  if (isServer) {
    return createStore(reducer, enhancer);
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage/session").default;

    const persistConfig = {
      key: "root",
      storage,
      whitelist: [ "user","article", "board",'vote'], 
      blacklist:['comment']
    };

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = createStore(persistedReducer, enhancer);

    store.__persistor = persistStore(store);

    return store;

  }
}





const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'davelopment'
})

export default wrapper
