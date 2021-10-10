import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import styled from 'styled-components';
import MyCoin from '../components/MyCoin';
import Transaction from '../components/Transaction';
import NonTrading from '../components/NonTrading';

const WalletContainer = styled.div`
    display: block;
    width: 100%;
    padding: 1% 10%;
    background: #222;

    & > div {
        width: 100%;
        color: #000;
        background: #fff;    
    }
`

const Category = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;

    & > div {
        width: 33.33%;
        height: 40px;
        text-align: center;
        line-height: 38px;
    }

    & > div > a {
        display: inline-block;
        width: 100%;
        color: #000;
        border-bottom: 2px solid #eee;
        cursor: pointer;
    }
    & > div > a:hover {
        color: crimson;
        border-bottom: 2px solid crimson;
    }
`

const WalletScreen = () => {
    const { isLogin } = useSelector((state) => state.user);

    const List = ["보유코인", "거래내역", "미체결내역"];

    const [currentClick, setCurrentClick] = useState(0);
    const [prevClick, setPrevClick] = useState(null);

    // [내 지갑] 카테고리 버튼 색상 변경
    const handleClick = e => {
        setCurrentClick(e.target.id);
    };

    useEffect(() => {
        if (isLogin == true) {
            if (currentClick !== null) {
                let current = document.getElementById(currentClick);
                current.style.color = 'crimson';
                current.style.borderBottomColor = 'crimson';
            }

            if (prevClick !== null) {
                let prev = document.getElementById(prevClick);
                prev.style.color = '#000';
                prev.style.borderBottomColor = "#eee";
            }

            setPrevClick(currentClick);
        }
    }, [currentClick]);

    useEffect(() => {
        isLogin == false && Router.push('/login');
    });

    return (
        <>
            {
                isLogin == true
                ? (
                    <WalletContainer>
                        <Category>
                            {
                                List.map((e, k) => {
                                    return (
                                        <div key={k}>
                                            <a id={k} onClick={handleClick}>{e}</a>
                                        </div>
                                    );
                                })
                            }
                        </Category>
                        {
                            currentClick == 0
                                ? <MyCoin />
                                : (currentClick == 1
                                    ? <Transaction />
                                    : (currentClick == 2
                                        ? <NonTrading />
                                        : '페이지 오류입니다.'
                                    )
                                )
                        }
                    </WalletContainer>
                )
                : null
            }
        </>
    );
}

export default WalletScreen;