import styles from "../styles/Chart.module.css"
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import dayjs from 'dayjs'
import { useSelector } from "react-redux";



  
  const Chart = () => {

    const {series} = useSelector(state=>state.exchange)

    
    const options = {
      title: {
        text: 'Aguh Coin',
        align: 'center',
        size: '20px',
      },
      annotations: {
        xaxis: [
          {
            x: 'Oct 06 14:00',
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                fontSize: '12px',
                color: '#fff',
                background: '#00E396'
              },
              orientation: 'horizontal',
              offsetY: 7,
              text: 'Annotation Test'
            }
          }
        ]
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function (val) {
            return dayjs(val).format('MMM DD HH:mm')
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }


    return (
      <div id="chartBox">
        <div id="chart">
          <>
            {/* <span className={styles.coin_name}>악어코인</span><span className={styles.sub_side}>시세 정보</span> */}
          </>
          <ReactApexChart
            className={styles.coin_chart}
            options={options}
            series={series}
            type="candlestick"
            height={450}
          />
        </div>
      </div>
    )
  }
  
  export default Chart