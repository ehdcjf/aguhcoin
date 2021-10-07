import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { UserLogoutAction } from '../reducers/user';
import { NonTrading_REQUEST } from '../reducers/wallet';
import { MdOutlineTimer } from 'react-icons/md';

const Timer = () => {
    const dispatch = useDispatch();
    const { userid, useridx } = useSelector((state) => state.user);

    const [minutes, setMinutes] = useState(parseInt(60));
    const [seconds, setSeconds] = useState(parseInt(0));

    // 타이머 초기화
    const resetTime = () => {
        setMinutes(parseInt(60));
        setSeconds(parseInt(0));
    }
    
    // 타이머 작동
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    // 타이머 종료 시 자동 로그아웃
    useEffect(() => {
        if (minutes == 0 && seconds == 0) {
            const data = {
                userid: userid,
                useridx: useridx,
            }
            dispatch(UserLogoutAction(data));
            dispatch(NonTrading_REQUEST());
            alert('로그인 유효 시간이 만료되어 자동 로그아웃 되었습니다.');
            Router.push('/');
        }
    }, [seconds]);

    return (
        <div>
            <a onClick={resetTime}>
                <MdOutlineTimer
                    size="15"
                    style={{ marginRight: "10px" }}
                />
                {minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초
            </a>
        </div>
    );
};

export default Timer;