import styles from '../styles/Trading.module.css'
import { useEffect,useState } from 'react'
import styled from 'styled-components'
import Buy from '../components/Buy';
import Sell from '../components/Sell'


const TradingContain = styled.div`
    width: 450px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid black;
    background: white;
`

const Trading = ()=>{
    const Subheader = ["매수","매도"];

    const [currentClick, setCurrentClick] = useState(0)
    const [prevClick , setPrevClick] = useState(null);


    const handleClick = e =>{
        setCurrentClick(e.target.id)
    }

    useEffect(() => {
        if (currentClick !== null) {
            let current = document.getElementById(currentClick);
            current.style.color = '#DC143C';
            current.style.borderBottomColor = '#DC143C';
        }

        if (prevClick !== null) {
            let prev = document.getElementById(prevClick);
            prev.style.color = '#000';
            prev.style.borderBottomColor = "#eee";
        }
        setPrevClick(currentClick);
    }, [currentClick]);

    return(
        <>
            <TradingContain>
                {
                    Subheader.map((e,k)=>{
                        return(
                            <div key={k}>
                                <a 
                                id={k} 
                                onClick={handleClick}
                                className={styles.sub_header}
                                >
                                {e}
                                </a>
                            </div>
                        )
                    })
                }
                {
                    currentClick == 0
                    ? 
                    <Buy/>
                    :(currentClick == 1 
                        ?
                        <Sell/>
                        :'page error') 
                }
            </TradingContain>
        </>
    )
}

export default Trading;
// export default function Trading(){
//     const Subheader =()=>{
//         return(
//             <div>
//                 <span><a>매수</a></span>
//                 <span><a>매도</a></span>
//             </div>
//         )
//     }

//     return (
//         <div className={styles.hi}>
//             <Subheader/>
//         </div>
//     )
// }



// import styles from '../styles/Trading.module.css'
// import { useState } from 'react'


// function Subheader(){
//     return(
//         <>
//         <div className={styles.sub_header}>
//             <span><a class="buy" className={styles.mesu}>매수</a></span>
//             <span><a>매도</a></span>
//         </div>
//         </>
//     )
// }
// const Buy = ()=>{
//     return(
//         <>
//             <ul className={styles.buy_contain}>
//                 <li><a>주문 가능액</a><h3 className={styles.possible_asset}>자기 자산만큼</h3></li>
//                 <li><a>매수 가격(krw)</a><input type="text"/></li>
//                 <li><a>주문 수량</a><input type="text"/></li>
//                 <li><a>주문 총액</a><input type="text"/></li>
//                 <div className={styles.cf}>-최소 주문금액: 1,000 KRW    -수수료: 0.05 %</div>
//                 <button className={styles.buy_button}>매수하기</button>
//             </ul>
//         </>
//     )
// }
// const Sell = ()=>{
//     return(
//         <>
//         <ul className={styles.buy_contain}>
//                 <li><a>주문 가능액</a><h3 className={styles.possible_asset}>자기 자산만큼</h3></li>
//                 <li><a>매도 가격(krw)</a><input type="text"/></li>
//                 <li><a>주문 수량</a><input type="text"/></li>
//                 <li><a>주문 총액</a><input type="text"/></li>
//                 <div className={styles.cf}>-최소 주문금액: 1,000 KRW    -수수료: 0.05 %</div>
//             </ul>
//         </>
//     )
// }

// const [buy , setBuy] = useState(<Buy/>)
// const [sell, setSell] = useState(<Sell/>)
// function changeTrading(){
//     setBuy(<Buy/>)
//     setSell(<Sell/>)
// }

// const Trading =()=> {
//         return(
        
//             <div className={styles.trading}>
//                 <Subheader/>
//                  <Buy/>
//                {/* <Sell/> */}
//                 {/* <>
//                 {bs}
//                 </> */}
//             </div>
        
//         )
// }

// export default Trading