import styles from "../styles/Hogachang.module.css"
import { useEffect,useState } from "react"




const Hogachang = ()=>{
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