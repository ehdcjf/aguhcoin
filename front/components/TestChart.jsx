
import { Chart } from "react-google-charts";
import { useSelector,useDispatch } from "react-redux";

const TestChart = () => {

  const {chartdata,header} = useSelector((state)=>state.test)

  
  return (
    <Chart
  width={'100'}
  height={350}
  chartType="CandlestickChart"
  loader={<div>Loading Chart</div>}
  data={[header,...chartdata]}
  options={{
    legend: 'none',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
  );
}

export default TestChart;


