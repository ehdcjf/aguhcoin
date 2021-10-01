import {createWrapper} from 'next-redux-wrapper'
import {applyMiddleware, createStore, compose} from 'redux'
import reducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// npm install redux-thunk

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    // console.log(action,dispatch,getState)
    console.log(action)
    return next(action)
}

// redux middleware 사용할수있는 설정까지하고 그리고 devtools사용까지. 

const configureStore = () => {
    const middlewares = [loggerMiddleware,thunkMiddleware]
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    // const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
    const Store = createStore(reducer,enhancer)    
    return Store
} // createStore (reducer) === createContext (상태초기값) 초기값을 상태를 가지고
  //              reducer안에 상태초기값을 가지고있어요   

// 첫번째 redux의 
// Store => const Store = createContext(initialState) 
// 두번째
const wrapper = createWrapper(configureStore,{
    debug:process.env.NODE_ENV === 'development'
}) // createWrapper ?  configureStore Store를 가지고있는 함수표현식에대한 함수

export default wrapper // wrapper ? 