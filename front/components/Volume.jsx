import styles from '../styles/Volume.module.css'

const Volume = () =>{
    return(
        <>
            
            <div className={styles.volume}>
                <span><a>체결</a></span>
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
                    <tr>
                        <td>10.05 <a>08:29</a></td>
                        <td>60,112,000</td>
                        <td>0.0192054</td>
                        <td>299,945</td>
                    </tr>
                    <tr>
                        <td>10.05 <a>08:30</a></td>
                        <td>60,416,000</td>
                        <td>0.0190072</td>
                        <td>299,945</td>
                    </tr>
                    <tr>
                        <td>10.05 <a>08:32</a></td>
                        <td>60,194,000</td>
                        <td>0.0147072</td>
                        <td>299,945</td>
                    </tr>
                    <tr>
                        <td>10.05 <a>08:35</a></td>
                        <td>60,830,000</td>
                        <td>0.0230072</td>
                        <td>299,945</td>
                    </tr>
                </tbody>
            </table>
            </div>
            

        </>
    )
}

export default Volume