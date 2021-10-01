import { useState } from "react";
import { nicknameCheck } from "../api/joinRequest";

import { StyledJoinItem } from "./joinItem";

const Nickname = ({
  value,
  onComplete,
  prev,
  next,
  handleNext,
  handlePrev,
}) => {
  const [nickname, setNickname] = useState(value);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const [available, setAvailable] = useState(null);

  const handleCheck = async () => {
    const data = {
      nickname: nickname,
    };

    const result = await nicknameCheck(data);
    console.log(data);
    if (result.success) {
      setAvailable(true);
      onComplete(data.nickname);
    } else if (result.success == false) {
      setAvailable(false);
      onComplete("");
    } else {
      alert(result.error);
    }
  };

  return (
    <StyledJoinItem>
      <h1>닉네임</h1>
      <div className='content'>
        <div>
        <input
          type="text"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
          maxLength="16"
          />
        <button onClick={handleCheck}>중복 확인</button>
          </div>
      {(available === true || value !== "") && (
        <span>사용가능한 닉네임입니다.</span>
        )}
      {available === false && <span>이미 사용중인 닉네임입니다.</span>}
        </div>

      <div className="btn_box">
        <button onClick={handlePrev}>{prev}</button>
        {available === true && <button onClick={handleNext}>{next}</button>}
      </div>
    </StyledJoinItem>
  );
};

export default Nickname;
