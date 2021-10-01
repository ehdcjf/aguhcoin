import styled from "styled-components";
import cn from "classnames";

const StyledGender = styled.div`
  & > .btn_box {
    & > .isSelected {
      border: 1px solid blue;
      background-color: cyan;
    }
  }
`;

const GenderSelect = ({value, onBitChange,}) => {
  return (
    <StyledGender>
      <h2>성별</h2>
      <div className="btn_box">
        <button
          className={cn({ isSelected: value&(1<<0) })}
          onClick={() => {
            onBitChange(0);
          }}
        >
          남자
        </button>
        <button
          className={cn({ isSelected: value&(1<<1) })}
          onClick={() => {
            onBitChange(1);
          }}
        >
          여자
        </button>
      </div>
    </StyledGender>
  );
};

export default GenderSelect;
