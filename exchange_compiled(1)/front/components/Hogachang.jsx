import styles from "../styles/Hogachang.module.css"
import { useEffect,useState,  } from "react"
import { useSelector } from "react-redux";


const Hogachang = ()=>{
    const { buyList, sellList, txList } = useSelector((state) => state.exchange)

    const renderTxList = () =>{
        if (txList.length > 0) {
            return (txList.slice(0, 5).map((e, k) => {
                return (
                    <tr key={k}>
                        <td>{e.price}</td>
                        <td>{e.buy_commission}</td>
                    </tr>
                )
            })
            )
        } else {
            return <tr><td>없음</td></tr>
        }

    }

    const renderSellList = () => {
        if (sellList.length > 0) {
            return (sellList.slice(0, 6).map((e, k) => {
                return (
                    <tr key={k} className={styles.table_sell}>
                        <td>{e.price}</td>
                        <td>{e.leftover}</td>
                    </tr>
                )
            })

            )
        } else {
            return <tbody><tr><td>없음</td></tr></tbody>
        }
    }
    const renderBuyList = () => {
        if (buyList.length > 0) {
            return (buyList.slice(0, 6).map((e, k) => {
                return (
                    <tr key={k} className={styles.table_buy}>
                        <td>{e.leftover}</td>
                        <td>{e.price}</td>
                    </tr>
                )
            })

            )
        } else {
            return <tbody><tr><td>없음</td></tr></tbody>
        }
    }

    useEffect(()=>{
        // console.log('aaaa', sellList)
        renderTxList();
        renderSellList();
        renderBuyList();
    },[sellList])
    return(
        <>
            <div className={styles.hoga}>
                <span><a>일반 호가</a></span>
                <table className={styles.table_small}>
                <caption><span>체결 강도  <a>  +125.20%</a></span></caption>
                <thead>
                    <tr>
                        <td>체결가</td>
                        <td>체결량</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTxList()}
                </tbody>
            </table>
            <table className={styles.table_main}>
                {renderSellList()}
            </table>
            <table className={styles.table_main}>
                {renderBuyList()}
            </table>
            </div>
            
        </>
    )
}

export default Hogachang