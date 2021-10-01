import FormLayout from '../components/FormLayout';
import Head from 'next/head';
import useInput from '../hooks/useInput';
import {useState} from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const BigTitle = styled.div`
    position: fixed;
    bottom: 10.474337872213077rem;
    left: 5.985335926978902rem;
    & > h1 {
        /* top: 200; */
        /* background: red; */
    }
    /* background: blue; */
`

const Content = styled.div`
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    display: flex;
    & > div {
        flex-grow: 0;
        width: 25.437677689660333rem;
        padding: 4.489001945234176rem 2.992667963489451rem 2.992667963489451rem;
        min-height: 31.021558158122353rem;
        position: relative;
        background: #f9f9f9;
        color: #111;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        display: flex;
    }
    

    /* position: relative;
    flex-direction: column;
    width: 500px;
    height: 600px;
    margin-top: 10%;
    margin-right: 100px;
    padding: 100px 70px;
    float: right;
    color: #000;
    background: #fff; */
`

const Join = () => {

    const userid = useInput('')
    const username = useInput('')
    const userphone = useInput('')
    const userpassword = useInput('')

    const [passwordCheck,setPasswordCheck] = useState('')
    const [passwordError,setPasswordError] = useState(false)

    const handlePassword = e => {
        const {value} = {...e.target}
        setPasswordError(userpassword.value !== value) // 1234 === 1234 ture
        setPasswordCheck(value)
    }

    const [term,setTerm] = useState(false)
    const [termError,setTermError] = useState(false)

    const handleTerm = e => {
        setTermError(e.target.checked !== true) 
        setTerm(e.target.checked)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(userpassword.value !== passwordCheck) {
            setPasswordError(true)
            return
        } else {
            setPasswordError(false)
        }

        if(!term) {
            setTermError(true)
            return; 
        }

        console.log({
            userid:userid.value,
            username:username.value,
            userpw:userpassword.value,
            userphone:userphone.value
        })
    }

    return (
        <>
            <Head>
                <title>악어코인 | 회원가입</title>
            </Head>
            <FormLayout>
                <BigTitle>
                    <h1>악어코인 회원가입</h1>
                </BigTitle>
                <Content>
                    <div>
                        <h2>회원가입</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" {...userid} placeholder="아이디를 입력해주세요."/> <br/>
                            <input type="text" {...username} placeholder="이름를 입력해주세요." /> <br/>
                            <input type="password" {...userpassword} placeholder="패스워드를 입력해주세요."/> <br/>
                            <input type="password" value={passwordCheck} onChange={handlePassword} placeholder="패스워드를 다시 입력해주세요."/> <br/>
                            { passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div> }
                            <input type="text" {...userphone} placeholder="전화번호를 입력해주세요."/> <br />
                            <input type="checkbox" checked={term} id="term" onChange={handleTerm} /> 
                            <label htmlFor="term">약관에 동의해주셈</label>
                            {termError && <div style={{color:'red'}}>약관에 동의해주라고...</div>}
                            <br />
                            <button type="submit">회원가입</button>
                        </form>
                        <p onClick={()=>Router.back()}>뒤로가기</p>
                    </div>
                </Content>
            </FormLayout>
        </>
    )
}

export default Join