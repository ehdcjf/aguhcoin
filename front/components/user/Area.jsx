import styled from "styled-components";
import classNames from "classnames";
import { korea } from "../../public/korea";
import { StyledJoinItem } from "./joinItem";


const Area = ({ value, onComplete, title, prev,next,handleNext,handlePrev }) => {
  const renderArea = () => {
    return korea.map((v, i) => {
      return (
        <button
          key={i}
          className={classNames({ isSelected: value == i })}
          onClick={() => {
            onComplete(i);
          }}
        >
          {v}
        </button>
      );
    });
  };

  return (
    <StyledJoinItem>
      {title!=null &&(<h1>{title}</h1>)}
      
      <div className='content area_conetnt'>{renderArea()}</div>
      
      {title!=null &&(
        <div className='btn_box'>
        <button onClick={handlePrev}>
          {prev}
        </button>
        {value !== null && (
          <button onClick={handleNext}>
            {next}
          </button>
        )}
      </div>
      )}
      
    </StyledJoinItem>
  );
};

export default Area;
