import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserJoinAction } from '../reducers/user';
import Router from 'next/router';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const JoinContainer = styled.div`
    display: block;
    position: fixed;
    width: 100%;
    padding: 5% 10%;
    background: #222;
`

const Title = styled.div`
    position: fixed;
    bottom: 15%;

    & > h1 {
        font-size: 50px;
    }
`

const StepBlock = styled.div`
    margin-bottom: 10px;
    text-align: right;
    
    & > div {
        display: inline-block;
        margin-left: 5px;
        padding: 2px 12px;
        background: slategray;
        border-radius: 1px;
        opacity: 80%;
    }
`

const Content = styled.div`
    position: relative;
    width: 500px;
    height: 580px;
    float: right;
    background: #fff;

    & > h4 {
        padding: 10px 20px;
        font-weight: normal;
        color: #fff;
        background: #111;
    }

    & > form {
        padding: 30px;
    }
`

const InputContainer = styled.div`
    & > h5 {
        margin-bottom: 10px;
        font-size: 20px;
        color: #000;
        font-weight: normal;
    }

    & > input {
        width: 100%;
        padding: 10px 5px;
        margin-bottom: 10px;
        border: none;
        border-bottom: 1px solid;
        border-color: lightgray;
        outline: none;
    }
    & > input:hover {
        border-bottom: 1px solid #000;
        transition: 0.5s;
    }
`

const ButtonBox = styled.div`
    position: absolute;
    width: 100%;
    padding: 30px;
    left: 0;
    bottom: 0;

    & > button {
        width: 30%;
        margin-left: 10px;
        padding: 10px 20px;
        float: right;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        border: none;
        border-radius: 3px;
    }
    & > button:nth-child(1) {
        background: crimson;
    }
    & > button:nth-child(2) {
        background: #666;
    }
    & > button:hover {
        color: #fff;
        transition: 0.5s;
        filter: brightness(120%);
    }
`

const JoinScreen = () => {
    const dispatch = useDispatch();

    const userid = useInput('');
    const userpw = useInput('');

    const [userpwCheck, setUserpwCheck] = useState('');
    const [userpwError, setUserpwError] = useState(false);

    // 비밀번호 재입력 오류 메시지
    const pwdCheckMsg = e => {
        const { value } = { ...e.target };
        setUserpwError(userpw.value !== value);
        setUserpwCheck(value);
    }

    // 비밀번호 재입력 불일치 시 밸류값 초기화
    const pwdFocusout = e => {
        if (userpwError === true){
            setUserpwCheck('');
            e.target.value = '';
        }
    }

    // 회원가입 버튼 클릭 시 submmit
    const handleSubmit = e => {
        e.preventDefault();

        if (userpw.value && userpwCheck == ''){
            alert('아이디와 비밀번호는 필수 입력 사항입니다.');
            return;
        } else {
            setUserpwError(false);
        }

        const data = {
            userid:userid.value,
            userpw:userpw.value
        }

        dispatch(UserJoinAction(data));
        Router.push('/');
    }

    return (
        <>
            <JoinContainer>
                <Title>
                    <h1>악어코인 회원가입</h1>
                </Title>
                <StepBlock>
                    <div /><div /><div />
                </StepBlock>
                <Content>
                    <h4>정보 입력</h4>
                    <form onSubmit={handleSubmit}>
                        <InputContainer>
                            <h5>아이디</h5>
                            <input type="text" {...userid} placeholder="아이디 입력" /> <br />
                        </InputContainer>
                        <InputContainer>
                            <h5>비밀번호</h5>
                            <input type="password" {...userpw} placeholder="비밀번호 입력" /> <br />
                            <input
                                type="password"
                                value={userpwCheck}
                                onChange={pwdCheckMsg}
                                onBlur={pwdFocusout}
                                placeholder="비밀번호 재입력" /> <br />
                            {
                                userpwError
                                    ? <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
                                    : null
                                // : <div style={{ color: "green" }}>비밀번호가 일치합니다.</div>
                            }
                        </InputContainer>
                        <ButtonBox>
                            <button type="submit">회원가입</button>
                            <button onClick={() => Router.back()}>뒤로가기</button>
                        </ButtonBox>
                    </form>
                </Content>
            </JoinContainer>
        </>
    );
}

export default JoinScreen;