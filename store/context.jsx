import {createContext} from 'react'

export const initalState = {
    IsLogin:true,
}
const Store = createContext(initalState) // 결과값 Store 컴포넌트이다.

export default Store