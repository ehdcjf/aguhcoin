import  {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';



const style={
  width:'20vw',
  height: '20px',
  margin:'20px'
}

const DoubleRangeSlider2 = ({left,right, handleLeft, handleRight,min,max}) => {

  const handleChange=(value)=>{
    handleLeft(value[0])
    handleRight(value[1])
  }

  return (
    <div>
      <h2>나이</h2>
      <div style={{display:'flex'}}> 
        <span>{left}살</span>
      <Range allowCross={false} style={style} defaultValue={[left, right]} onChange={handleChange} min={min} max={max}/>
        <span>{right}살</span>
      </div>
    </div>
  );
}

export default DoubleRangeSlider2;



