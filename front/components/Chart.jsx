import styles from "../styles/Chart.module.css"
import { useState } from "react"

const Chart_header = ()=>{
    return(
        <>  
            <span className={styles.coin_name}>악어코인</span><span className={styles.sub_side}>시세 정보</span>
        </>
    )
}


const Chart = ()=>{
    const [chart,setChart] = useState()

    return(
        <>
            <div className={styles.chart}> 
                <Chart_header className={styles.chart_header}/>
            </div>
            <div>
                {setChart}
            </div>
        </>
    )
}

export default Chart