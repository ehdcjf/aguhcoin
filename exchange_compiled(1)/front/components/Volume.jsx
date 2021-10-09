import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/Volume.module.css'

const Volume = () => {
    const { txList } = useSelector((state) => state.exchange)
    function renderTxList() {
        
        if (txList.length > 0) {
            return (
                txList.slice(0,9).map((e, k) => {
                    const date = (e.tx_date.split("."))
                    // console.log("날짜 나누기",e.tx_date.split(".")) //['2021', ' 10', ' 7', ' 오후 3:13:30']
                    return (
                        <tr key={k}>
                            <td>{date[3]}</td>
                            <td>{e.price}</td>
                            <td>{e.buy_commission}</td>
                            <td>{e.price * e.buy_commission}</td>
                        </tr>
                    )
                })
            )
        } else {
            return (
                <tr><td>없음</td></tr>
            )
        }
    }
    useEffect(() => {
        renderTxList();
    })
    return (
        <>
            <div className={styles.volume}>
                <span><a>체결 정보</a></span>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>체결시간</td>
                            <td>체결가격</td>
                            <td>체결량(AGU)</td>
                            <td>체결금액(KRW)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTxList()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Volume