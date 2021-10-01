import cn from "classnames";
import { StyledJoinItem } from "./joinItem";

const Gender = ({ title=null,value, onComplete, prev,next,handleNext,handlePrev }) => {
  const handleGender = (data) => {
    onComplete(data);
  };

  return (
    <StyledJoinItem>
      <h1>성별</h1>
      <div className="content gender_content">
        <button
          className={cn({ isSelected: value == true })}
          onClick={() => {
            handleGender(true);
          }}
        >
          남자
        </button>

        <button
          className={cn({ isSelected: value == false })}
          onClick={() => {
            handleGender(false);
          }}
        >
          여자
        </button>
      </div>
      
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
    </StyledJoinItem>
  );
};

export default Gender;
