import { list19 } from "../../public/list19";
import styled from "styled-components";
import classNames from "classnames";
const VoteSelector = ({value,onBitChange}) => {

  const renderCandidate = () => {
    return list19.map((v, i) => {
      return (
        <li
          className={classNames({ isSelected: value&(1<<v.politician_id) })}
          key={i}
        >
          <div
            onClick={() => {
              onBitChange(v.politician_id);
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
    <div>
      <h2>19대 대선 지지 후보</h2>
      {renderCandidate()}
    </div>
  );
}

export default VoteSelector;