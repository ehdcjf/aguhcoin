import styles from '../styles/Trading.module.css'
const Buy = ()=>{
    return(
        <>
        <ul className={styles.buy_contain}>
           <li><a>주문 가능액</a><h3 className={styles.possible_asset}>자기 자산만큼</h3></li>
           <li><a>매수 가격(krw)</a><input type="text"/></li>
           <li><a>주문 수량</a><input type="text"/></li>
           <li><a>주문 총액</a><input type="text"/></li>
           <div className={styles.cf}>-최소 주문금액: 1,000 KRW    -수수료: 0.05 %</div>
           <button className={styles.buy_button}>매수하기</button>
       </ul>
        </>
    )
}

export default Buy