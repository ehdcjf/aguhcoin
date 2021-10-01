import FormLayout from "../components/FormLayout"
import Head from 'next/head'
import Router from 'next/router'
import useInput from '../hooks/useInput'
import {useDispatch,useSelector} from 'react-redux'
import { UserLoginAction } from "../reducers/user"
import {useEffect} from "react"


const Login = () => {
    const dispatch = useDispatch()
    const {loadding,IsLogin} = useSelector( (state)=>state.user )

    const userid = useInput('') // Object
    const userpw = useInput('') // Object

    const handleSubmit = e => {
        e.preventDefault()
        
        const data = {
            userid:userid.value,
            userpw:userpw.value
        }

        dispatch(UserLoginAction(data))
    }

    useEffect(()=>{ // componentDidUpdate
        IsLogin === true && Router.push('/')
        // : alert('아이디와 패스워드가 다릅니다.')
    },[loadding])


    return (
        <>
            <Head>
                <title>악어코인 | 로그인</title>
            </Head>
            <FormLayout>
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>                                  
                    <input type="text" {...userid }  placeholder="아이디를입력해주세요." />
                    <input type="password"  {...userpw}  placeholder="패스워드를 입려해주세요."/>
                    {loadding ? '나로딩중~~' : <button type="submit">로그인</button>}
                </form>
            </FormLayout>
        </>
    )
}

export default Login