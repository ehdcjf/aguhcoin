import classNames from "classnames";
import { StyledJoinItem } from "./joinItem";


const Vote = ({
  title = null,
  value,
  onComplete,
  list,
  prev,
  next,
  handleNext,
  handlePrev,
}) => {

  const renderCandidate = () => {
    return list.map((v, i) => {
      return (
        <li
          className={classNames({ isSelected: value == v.politician_id })}
          key={i}
        >
          <div
            onClick={() => {
              onComplete(v.politician_id);
            }}
          >
            <div
              style={{ backgroundImage: `url(${v.politician_image})` }}
            ></div>
            <h3>{v.politician_name}</h3>
          </div>
        </li>
      );
    });
  };
  return (
    <StyledJoinItem>
      {title != null && <h1>{title}</h1>}
      <div className='content vote_content'>
      <ul>{renderCandidate()}</ul>
      </div>
      {title != null && (
        <div className='btn_box'>
          <button onClick={handlePrev}>{prev}</button>
          {value !== null && <button onClick={handleNext}>{next}</button>}
        </div>
      )}
    </StyledJoinItem>
  );
};

export default Vote;
