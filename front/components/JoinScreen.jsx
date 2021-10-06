import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DuplicateCheckAction, UserJoinAction } from '../reducers/user';
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
        opacity: 90%;
        transition: 0.5s;
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

    & > form > div:nth-child(2) {
        margin-top: 50px;
    }
`

const InputContainer = styled.div`
    & > h5 {
        width: 100%;
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

    & > div {
        display: inline-block;
        width: 100%;
        padding: 10px;
    }

    & > div > label {
        width: 90%;
        float: left;
        color: #000;
        user-select: none;
    }

    & > div > input {
        width: 10%;
        height: 24px;
    }

    & > span {
        font-size: 15px;
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
    const { userid, success } = useSelector((state) => state.user);

    const useridInput = useInput('');
    const userpw = useInput('');

    const [termCheck, setTermCheck] = useState(false);
    const [termCheck2, setTermCheck2] = useState(false);
    const [termCheckAll, setTermCheckAll] = useState(false);
    const [userpwCheck, setUserpwCheck] = useState(null);
    const [userpwError, setUserpwError] = useState(null);
    const [step, setStep] = useState(1);

    // 이전 Step으로 이동
    const prevStep = e => {
        e.preventDefault();

        if (step == 1) {
            Router.push('/');
        }

        setTermCheck(false);
        setTermCheck2(false);
        setTermCheckAll(false);
        setStep(step-1);
    }

    // 다음 Step으로 이동
    const nextStep = e => {
        e.preventDefault();

        if (termCheck == true && termCheck2 == true) {
            setStep(step+1);
        } else {
            alert('약관에 동의해주세요.');
        }
    }

    // Step 1 가입 동의
    // 동의
    const handleTerm = e => {
        const selected = e.target.id.split('check',4)[1];

        if (selected == 1) {
            setTermCheck(!termCheck);
        } else {
            setTermCheck2(!termCheck2);
        }
    }

    // 전체 동의
    const handleTermAll = () => {
        if (termCheck == false || termCheck2 == false || termCheckAll == false) {
            setTermCheck(true);
            setTermCheck2(true);
            setTermCheckAll(true);
        }
        if (termCheck == true && termCheck2 == true && termCheckAll == true) {
            setTermCheck(false);
            setTermCheck2(false);
            setTermCheckAll(false);
        }
    }

    // Step 2 정보 입력
    // 회원가입 유효성 검사
    const duplicateCheck = () => {
        if (useridInput.value != '') {
            const data = {
                userid: useridInput.value,
            }
    
            dispatch(DuplicateCheckAction(data));
        }
    }

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

        const idInput = document.getElementById('idInput');
        const pwInput = document.getElementById('pwInput');
        const pwcInput = document.getElementById('pwcInput');

        if (idInput.value == '' || pwInput.value == '' || pwcInput.value == ''){
            alert('아이디와 비밀번호는 필수 입력 사항입니다.');
            return;
        } else {
            setUserpwError(false);
        }

        const data = {
            userid:useridInput.value,
            userpw:userpw.value
        }

        dispatch(UserJoinAction(data));
        nextStep(e);
    }

    // 메인으로
    const goMain = e => {
        e.preventDefault();
        Router.push('/');
    }
    const goLogin = e => {
        e.preventDefault();
        Router.push('/login');
    }

    return (
        <>
            <JoinContainer>
                <Title>
                    <h1>악어코인 회원가입</h1>
                </Title>
                <StepBlock>
                    <div id="step1" style={step == 1 ? {background:"crimson"} : {background:"slategray"}} />
                    <div id="step2" style={step == 2 ? {background:"crimson"} : {background:"slategray"}} />
                    <div id="step2" style={step == 3 ? {background:"crimson"} : {background:"slategray"}} />
                </StepBlock>
                <Content>
                    {
                        step == 1 &&
                        (
                            <>
                                <h4>가입 동의</h4>
                                <form>
                                    <InputContainer>
                                        <div>
                                            <input
                                                id="check1"
                                                type="checkbox"
                                                checked={termCheck}
                                                onChange={handleTerm}
                                            />
                                            <label htmlFor="check1">사람입니다.</label>
                                        </div>
                                        <div>
                                            <input
                                                id="check2"
                                                type="checkbox"
                                                checked={termCheck2}
                                                onChange={handleTerm}
                                            />
                                            <label htmlFor="check2">가입에 동의합니다.</label>
                                        </div>
                                        <div style={{marginTop:"200px"}}>
                                            <input
                                                id="checkAll"
                                                type="checkbox"
                                                checked={termCheckAll}
                                                onChange={handleTermAll}
                                            />
                                            <label htmlFor="checkAll">전체 동의하기</label>
                                        </div>
                                    </InputContainer>
                                    <ButtonBox>
                                        <button onClick={nextStep}>다음으로</button>
                                        <button onClick={prevStep}>메인으로</button>
                                    </ButtonBox>
                                </form>
                            </>
                        )
                    }
                    {
                        step == 2 &&
                        (
                            <>
                                <h4>정보 입력</h4>
                                <form onSubmit={handleSubmit}>
                                    <InputContainer>
                                        <h5>아이디</h5>
                                        <input
                                            id="idInput"
                                            type="text"
                                            onBlur={duplicateCheck}
                                            placeholder="아이디 입력"
                                            {...useridInput}
                                        />
                                        {
                                            success == false
                                            ? <span style={{ color: "red" }}>이미 등록 되어있는 아이디입니다.</span>
                                            : null
                                        }
                                    </InputContainer>
                                    <InputContainer>
                                        <h5>비밀번호</h5>
                                        <input
                                            id="pwInput"
                                            type="password"
                                            placeholder="비밀번호 입력"
                                            {...userpw}
                                        />
                                        <input
                                            id="pwcInput"
                                            type="password"
                                            value={userpwCheck}
                                            onChange={pwdCheckMsg}
                                            onBlur={pwdFocusout}
                                            placeholder="비밀번호 재입력" />
                                        {
                                            userpwError == true
                                            ? <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>
                                            : null
                                        }
                                    </InputContainer>
                                    <ButtonBox>
                                        <button type="submit">회원가입</button>
                                        <button onClick={prevStep}>뒤로가기</button>
                                    </ButtonBox>
                                </form>
                            </>
                        )
                    }
                    {
                        step == 3 &&
                        (
                            <>
                                <h4>가입 완료</h4>
                                <form>
                                    <InputContainer>
                                        <span>
                                            {userid}님의 가입이 정상적으로 완료 되었습니다.
                                        </span>
                                    </InputContainer>
                                    <ButtonBox>
                                        <button onClick={goLogin}>로그인</button>
                                        <button onClick={goMain}>메인으로</button>
                                    </ButtonBox>
                                </form>
                            </>
                        )
                    }
                </Content>
            </JoinContainer>
        </>
    );
}

export default JoinScreen;