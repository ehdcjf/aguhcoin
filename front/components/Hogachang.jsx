// import styles from "../styles/Hogachang.module.css"
import { useEffect,useState,  } from "react"
import { useSelector } from "react-redux";
import styled from 'styled-components';
// import {ResetError} from ''

const HogaChang = styled.div`
.hoga{
    background: white;
    width: 480px;
    height: 500px;
    /* margin-left: 50px; */
    border: 1px solid black;
    display: inline-block;
    box-sizing: border-box;
    /* overflow-y: scroll; */
}

.hoga>span>a{
    padding: 6px;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 40px;
    border: 1px solid #ededed;
    text-align: center;
    color: #222;
    border-bottom: 3px solid crimson;
}

.table_small{
    /* border: 1px solid #ededed; */
    display: inline-block;
    box-sizing: border-box;
    width: 30%
}

.table_small>caption{
    font-size: small;
    border-bottom: 1px solid #ededed;
    padding: 4px;
    width: 100%;
    font-size: 10px;
}

.table_small>caption>span>a{
    color: black;
}

.table_small>thead>tr>td{
    font-size: 11px;
    text-align: center;
    color: #222;
    width: 76px;
    border-bottom: 1px solid gray;
}

.table_small>tbody>tr>td{
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;
    font-size: 10px;
    text-align: center;
}

.table_sell{
    box-sizing: border-box;
    width: 66%;
    text-align: center;
    background: rgba(0, 0, 255, 0.03);
    color:crimson;
}
.table_sell:hover{
    cursor: pointer;
    background: rgba(0, 0, 139, 0.116);
}

.table_buy{
    box-sizing: border-box;
    width: 66%;
    text-align: center;
    color: rgba(255, 0, 0, 0.103);
    color:crimson;
}


.table_sell>tbody>tr>td{
    text-align: center;
    padding: 2px;
    box-sizing: border-box;
    width: 75%;
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;
    height: 40px;
}
.table_buyl>tr>td{
    text-align: center;
    padding: 2px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;
}
`
const Hogachang = ()=>{
    const { buyList, sellList, txList,isError,msg } = useSelector((state) => state.exchange)

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
            return(
                <tr>
                    <td>
                        없음
                    </td>
                </tr>
            ) 
            
        }

    }

    const renderSellList = () => {
        if (sellList.length > 0) {
            return (sellList.slice(0, 6).map((e, k) => {
                if(e.price==null && e.leftover==null){
                    return (
                    <tr key={k} className="table_sell">
                        <td>{" "}</td>
                        <td>{" "}</td>
                    </tr>
                    )   
                }else{
                    return (
                        <tr key={k} className="table_sell">
                            <td>{e.price}</td>
                            <td>{e.leftover}</td>
                        </tr>
                    )
                }
                
            })

            )
        } else {
            return(
                <tr>
                    <td>
                        없음
                    </td>
                </tr>
            ) 
        }
    }
    const renderBuyList = () => {
        if (buyList.length > 0) {
            return (buyList.slice(0, 6).map((e, k) => {
                return (
                    <tr key={k} className="table_buy">
                        <td>{e.price}</td>
                        <td>{e.leftover}</td>
                    </tr>
                )
            })

            )
        } else {
            return(
                <tr>
                    <td>
                        없음
                    </td>
                </tr>
            ) 
        }
    }

    useEffect(()=>{
        console.log('change~~~~~~')
        renderTxList();
        renderSellList();
    },[sellList,buyList,txList])

    useEffect(()=>{
        console.log('buyyyyyyyyyyyyyyyy')
        renderBuyList();
    },[buyList])


    // useEffect(()=>{
    //     if(isError){
    //         alert(msg);
    //     dispatch(ResetError()) 
    //     }

    // },[isError])

    return(
        <HogaChang>
            <div className="hoga">
                <span><a>일반 호가</a></span>
                <table className="table_small">
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
            <table className="table_sell">
                <tbody>{renderSellList()}</tbody>
            </table>
            <table className="table_buy">
                <tbody>{renderBuyList()}</tbody>
            </table>
            </div>
        </HogaChang>
    )
}

export default Hogachang