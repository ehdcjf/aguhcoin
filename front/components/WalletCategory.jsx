import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

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

const WalletCategory = () => {
    const List = [
        {
            url: "/wallet/mycoins",
            subejct: "보유코인"
        },
        {
            url: "/wallet/transaction",
            subejct: "거래내역"
        },
        {
            url: "/wallet/nontrading",
            subejct: "미체결"
        },
    ];

    const [currentClick, setCurrentClick] = useState(null);
    const [prevClick, setPrevClick] = useState(null);

    const handleClick = e => {
        setCurrentClick(e.target.id);
    };

    useEffect(() => {
        if (currentClick !== null) {
            let current = document.getElementById(currentClick);
            console.log(current);
            current.style.color = 'crimson';
            current.style.borderBottomColor = 'crimson';
        }

        // 두번 눌러야 색상 변경 됨..
        // 아래 코드 없어도 다른 div 색상 되돌아감..
        // 라우트 때문에 그런건가?
        // if (prevClick !== null) {
        //     let prev = document.getElementById(prevClick);
        //     // prev.style.color = '#000';
        //     // prev.style.borderBottomColor = "#eee";
        // }

        // setPrevClick(currentClick);
    }, [currentClick]);

    return (
        <div>
            <Category>
                {
                    List.map((e, k) => {
                        return (
                            <div>
                                <Link href={e.url}>
                                    <a
                                        id={k}
                                        onClick={handleClick}
                                        // style={{
                                        //     color: ctgColor == 1 ,
                                        key={k}
                                        // }}
                                        
                                    >
                                        {e.subejct}
                                    </a>
                                </Link>
                            </div>
                        );
                    })
                }
            </Category>
        </div>
    );
}

export default WalletCategory;