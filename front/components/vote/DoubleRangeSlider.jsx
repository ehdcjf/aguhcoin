import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const StyledDoubleRangeSlider = styled.div`
  position: relative;
  width: 500px;
  height: 100px;
  background-color: rgba(0,0,0,.1);

  .slider{
    position: relative;
    z-index: 1;
    height: 10px;
  }

  .slider>.track{
      position: absolute;
      z-index: 1;
      left:0;
      right: 0;
      top:0;
      bottom:0;
      border-radius: 5px;
      background-color: #c6aee7;
    }

    .slider>.range{
      position: absolute;
      z-index: 2;
      left: 25%;
      right: 25%;
      top:0;
      bottom:0;
      border-radius: 5px;
      background-color: #6200ee;
    }

    .thumb{
      position:absolute;
      z-index: 3;
      width: 30px;
      height: 30px;
      background-color: #6200ee;
      border-radius: 50%;
      opacity: .3;
      margin:0 15px
    }

    .thumb.left{
      left: 25%;
      transform: translate(-15px,-10px);
    }

    .thumb.right{
      right: 25%;
      transform: translate(15px,-10px);
    }
  
 

  input{
    position: absolute;
    pointer-events: none;
    -webkit-appearance:none;
    z-index: 2;
    height: 10px;
    width: 100%;
    opacity: 0;
  }

  input::-webkit-slider-thumb{
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border:0 none;
    background-color: red;
    -webkit-appearance:none;
    
  }

`


const DoubleRangeSlider = () => {
  const RANGE = useRef(null)
  const LEFT = useRef(null)
  const RIGHT = useRef(null)

  useEffect(()=>{
    const rightValue = Number(right)
    const rightPercent = ((rightValue-min)/(max-min))*100;
    RIGHT.current.style.right = (100-rightPercent)+`%`
    const leftValue = Number(left)
    const leftPercent = ((leftValue-min)/(max-min))*100;
    LEFT.current.style.left = leftPercent+`%`
    RANGE.current.style.left = leftPercent+`%`
    RANGE.current.style.right = (100-rightPercent)+`%`
  },[])

  const updateMin = (e)=>{
   
      handleLeft(e.target.value)
    
    const tempValue = Math.min(Number(left),Number(right)-1)
    const percent = ((tempValue-min)/(max-min))*100;
    LEFT.current.style.left = percent+`%`
    RANGE.current.style.left = percent+`%`
  }

  const updateMax = (e)=>{
      handleRight(e.target.value)
      const tempValue = Math.max(Number(right),Number(left)+1)
      const percent = ((tempValue-min)/(max-min))*100;
      RIGHT.current.style.right = (100-percent)+`%`
      RANGE.current.style.right = (100-percent)+`%`
      console.log('right',right)
  }
  


  return (
    <StyledDoubleRangeSlider>
      <h2>나이</h2>
      <span>{left} ~ {right}</span>
      <div className='double_range_slider'>
        <input type='range' onChange={updateMin} id = 'input_left' min ={min} max={max} value={left} />
        <input type='range' onChange={updateMax} id = 'input_right' min = {min} max={max} value={right}/>
        <div className='slider'>
          <div className='track'></div>
          <div className='range' ref={RANGE}></div>
          <div className='thumb left' ref={LEFT}></div>
          <div className='thumb right' ref={RIGHT}></div>
        </div>
      </div>
    </StyledDoubleRangeSlider>
  );
}

export default DoubleRangeSlider;