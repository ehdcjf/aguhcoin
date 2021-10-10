import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TransactionCtgAction } from '../reducers/wallet';

const ButtonBox = styled.div`
    flex-direction: row;
    width: 100%;
    height: 20%;
    align-items: center;

    & > div {
        display: flex;
        flex-direction: column;
        width: 33.33%;
        padding: 20px;
    }

    & > div > div {
        padding-bottom: 10px;
    }

    & > div > div > span {
        margin-left: 10px;
        color: gray;
        font-size: 12px;
        font-weight: lighter;
    }

    & > div > div > button {
        padding: 10px 20px;
        background: #fff;
        border: 1px solid lightgray;
        border-radius: 1px;
        cursor: pointer;
    }
    & > div > div > button:hover {
        color: steelblue;
        font-weight: bold;
        border: 1px solid steelblue;
    }
`

const Buttons = () => {
    const List1 = [
        {
            id: "1day",
            subejct: "1일"
        },
        {
            id: "7day",
            subejct: "7일"
        },
        {
            id: "1month",
            subejct: "1개월"
        },
        {
            id: "3month",
            subejct: "3개월"
        },
        {
            id: "6month",
            subejct: "6개월"
        },
    ];

    const List2 = [
        {
            id: "all",
            subejct: "전체"
        },
        {
            id: "buy",
            subejct: "매수"
        },
        {
            id: "sell",
            subejct: "매도"
        },
    ];

    const dispatch = useDispatch();
    const { userid, useridx } = useSelector((state) => state.user);
    
    const [currentClick1, setCurrentClick1] = useState(null);
    const [prevClick1, setPrevClick1] = useState(null);
    const [currentClick2, setCurrentClick2] = useState(null);
    const [prevClick2, setPrevClick2] = useState(null);

    const handleClick1 = e => {
        const data = {
            userid: userid,
            useridx: useridx,
            searchType: e.target.id,
        }

        setCurrentClick1(e.target.id);
        dispatch(TransactionCtgAction(data));
    };

    const handleClick2 = e => {
        setCurrentClick2(e.target.id);
    };

    useEffect(() => {
        if (currentClick1 !== null) {
            let current1 = document.getElementById(currentClick1);
            current1.style.color = 'steelblue';
            current1.style.fontWeight = 'bold';
            current1.style.borderColor = 'steelblue';
        }

        if (prevClick1 !== null) {
            let prev1 = document.getElementById(prevClick1);
            prev1.style.color = '#000';
            prev1.style.fontWeight = 'normal';
            prev1.style.borderColor = 'lightgray';
        }

        setPrevClick1(currentClick1);
    }, [currentClick1]);

    useEffect(() => {
        if (currentClick2 !== null) {
            let current2 = document.getElementById(currentClick2);
            current2.style.color = 'steelblue';
            current2.style.fontWeight = 'bold';
            current2.style.borderColor = 'steelblue';
        }

        if (prevClick2 !== null) {
            let prev2 = document.getElementById(prevClick2);
            prev2.style.color = '#000';
            prev2.style.fontWeight = 'normal';
            prev2.style.borderColor = 'lightgray';
        }

        setPrevClick2(currentClick2);
    }, [currentClick2]);

    return (
        <>
            <div>
                <div>
                    기간
                    <span>2021-08-31 ~ 2021.09.30</span>
                </div>
                <div>
                    {
                        List1.map((v, k) => {
                            return (
                                <>
                                    <button
                                        id={v.id}
                                        onClick={handleClick1}
                                        key={k}
                                    >
                                        {v.subejct}
                                    </button>
                                </>
                            );
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    거래종류
                </div>
                <div>
                    {
                        List2.map((v, k) => {
                            return (
                                <>
                                    <button
                                        id={v.id}
                                        onClick={handleClick2}
                                        key={k}
                                    >
                                        {v.subejct}
                                    </button>
                                </>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

const TransactionButton = () => {
    return (
        <>
            <ButtonBox>
                <Buttons />
            </ButtonBox>
        </>
    );
}

export default TransactionButton;