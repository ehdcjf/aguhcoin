import styles from "../styles/Hogachang.module.css"
import { useEffect,useState,  } from "react"
import { useSelector, useDispatch } from "react-redux";
import HogaAction from '../reducers/exchange'




const Hogachang = ()=>{
    const dispatch = useDispatch();
    const { buyList, sellList,txList } = useSelector((state) => state.exchange)

    // useEffect(()=>{
    //     const data = {
    //         hoga_price:hoga_price,
    //     }
    //     dispatch(HogaAction(data));
    // },[]);



const renderTxList = () =>{
    if(txList.length>0){

        
        return (   txList.slice(0,5).map((e,k)=>{
            return(
                <tr key ={k}>
                    <td>{e.price}</td>
                    <td>{e.buy_commission}</td>
                </tr>
            )
        })
        )
    }else{
        return <div>없음</div>
    }
    
}

    useEffect(()=>{
        console.log('aaaa', sellList)
        renderTxList();
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
                   
                    <tr>
                        <td>59,609,000</td>
                        <td>0.001</td>
                    </tr>
                    <tr>
                        <td>59,611,000</td>
                        <td>0.013</td>
                    </tr>
                    <tr>
                        <td>59,622,000</td>
                        <td>0.041</td>
                    </tr>
                    <tr>
                        <td>59,635,000</td>
                        <td>0.001</td>
                    </tr>
                </tbody>
            </table>
            <table className={styles.table_main}>
                <tr>
                    <td>59,913,000<a>+2.29%</a></td>
                    <td>0.101</td>
                </tr>
                <tr>
                    <td>59,913,000<a>+2.29%</a></td>
                    <td>0.101</td>
                </tr>
                <tr>
                    <td>59,913,000<a>+2.29%</a></td>
                    <td>0.101</td>
                </tr>
                <tr>
                    <td>59,913,000<a>+2.29%</a></td>
                    <td>0.101</td>
                </tr>
                <tr>
                    <td>59,913,000<a>+2.29%</a></td>
                    <td>0.101</td>
                </tr>
            </table>
            </div>
            
        </>
    )
}

export default Hogachang