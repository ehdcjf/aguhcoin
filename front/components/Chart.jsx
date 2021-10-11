
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import dayjs from 'dayjs'
import { useSelector } from "react-redux";
import styled from 'styled-components';

const Charts = styled.div`
.chart{
    background: white;
    width: 1000px;
    height: 450px;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 20px auto;
}

.chart_header{
    background: blue;
}
.sub_side{
    padding: 4px;
    display: inline-block;
    width: 90%;
    text-align: right;
}
/* .coin_chart{
    width: 1000px;
    height: 300px;
    margin: 30px auto;
    font-size: 24px;
    background: white;
} */
`

  
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
      <Charts>
      <div className="chart">
        <div>
          <ReactApexChart
            className="coin_chart"
            options={options}
            series={series}
            type="candlestick"
            height={450}
          />
        </div>
      </div>
      </Charts>
    )
  }
  
  export default Chart