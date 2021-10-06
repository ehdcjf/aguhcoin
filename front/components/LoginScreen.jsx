import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLoginAction } from '../reducers/user';
import Router from 'next/router';
import useInput from '../hooks/useInput';

const LoginContainer = styled.div`
    display: block;
    position: fixed;
    width: 100%;
    min-height: 100vh;
    padding: 5% 10%;
    background: #222;
`

const Content = styled.div`
    width: 500px;
    min-height: 600px;
    margin: 0 auto;
    padding: 30px;
    color: #000;
    background: #fff;

    & > h4 {
        padding: 30px;
        font-size: 30px;
        text-align: center;
    }

    & > form {
        display: flex;
        flex-direction: column;
        padding: 30px;
    }
`

const InputContainer = styled.div`
    & > div {
        margin-bottom: 20px;
        padding: 10px;
        background: #eee;
        border: 2px solid #eee;
        border-radius: 5px;
    }
    & > div:hover {
        transition: 0.5s;
        filter: brightness(95%);
    }

    & > div > h5 {
        margin-bottom: 5px;
        font-size: 15px;
        color: #555;
        font-weight: normal;
    }

    & > div > input {
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        background: none;
        border: none;
        outline: none;
    }
`

const ButtonBox = styled.div`
    width: 100%;
    padding: 50px;

    & > button {
        width: 100%;
        padding: 10px 20px;;
        color: #fff;
        font-weight: bold;
        background: crimson;
        border: none;
        border-radius: 3px;
        cursor: pointer;        
    }
    & > button:hover {
        color: #fff;
        transition: 0.5s;
        filter: brightness(120%);
    }

    & > div {
        margin-top: 10px;
        text-align: center;
    }

    & > div > a {
        color: steelblue;
        cursor: pointer;
    }
    & > div > a:hover {
        text-decoration: underline;
    }
`

const LoginScreen = () => {
    const dispatch = useDispatch();
    const { isLogin, success } = useSelector((state) => state.user);
    
    const userid = useInput('');
    const userpw = useInput('');

    // 로그인 유효성 검사
    const handleSubmit = e => {
        e.preventDefault();

        let inputID = document.getElementById('userid');
        let inputPW = document.getElementById('userpw');
        if (inputID.value == '' || inputPW.value == ''){
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        } else {
            const data = {
                userid: userid.value,
                userpw: userpw.value
            }
            dispatch(UserLoginAction(data));

            if (success == false) {
                alert('존재하지 않는 회원 정보입니다.');
                return;
            } else {
                if (isLogin == true) {
                    Router.push('/');
                }
            }
        }
    }

    useEffect(()=>{
        isLogin == true && Router.push('/');
    }, []);

    return (
        <>
            <LoginContainer>
                <Content>
                    <h4>로그인</h4>
                    <form onSubmit={handleSubmit}>
                        <InputContainer>
                            <div>
                                <h5>아이디</h5>
                                <input id="userid" type="text" {...userid} />
                            </div>
                            <div>
                                <h5>비밀번호</h5>
                                <input id="userpw" type="password"  {...userpw} />
                            </div>
                        </InputContainer>
                        <ButtonBox>
                            <button type="submit">로그인</button>
                            <div onClick={() => Router.push('/join')}>
                                아직 계정이 없으십니까? <a>클릭!</a>
                            </div>
                        </ButtonBox>
                    </form>
                </Content>
            </LoginContainer>
        </>
    );
}

export default LoginScreen;