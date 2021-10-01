import styled from "styled-components";
import { korea } from "../../public/korea";
import { list19 } from "../../public/list19";

import { joinRequest } from "../../components/api/joinRequest";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { UserLoginAction } from "../../reducers/user";

const StyledResult = styled.div`
  padding: 10vh 20vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  overflow: hidden;

  .btn_box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &>ul{
    margin:0 auto;
  }
  
  &>ul>li>span{
    display: block;
    margin-bottom:3vh;
    font-size: 28px;
  }

  img {
        display: block;
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
      }

  .candidata{
    display: block;
    width: 15vw;
    height: 15vw;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

`;

const Result = ({
  kakao,
  prev,
  handlePrev,
  nickname,
  gender,
  birth,
  hometown,
  residence,
  vote19,
  vote20,
  profil,
  voteId,
  latestVote,
  voteTitle,
  voteContent,
  voteDate,
}) => {
  const dispatch = useDispatch();
  const myvote19 = list19.filter((v) => v.politician_id == vote19.value)[0];
  const myvote20 = latestVote.filter((v) => v.politician_id == vote20.value)[0];
  const myhometown = korea[hometown.value];
  const myresidence = korea[residence.value];

  const handleSubmit = async () => {
    const data = {
      kakao,
      nickname: nickname.value,
      birth: birth.value,
      hometown: hometown.value,
      residence: residence.value,
      gender: gender.value,
      image: profil.value,
      vote19: vote19.value,
      vote20: vote20.value,
      vote_id: voteId,
    };
    const result = await joinRequest(data);
    dispatch(UserLoginAction(result));
    Router.push("/");
  };

  return (
    <StyledResult>
      <h1>최종확인</h1>
      <ul>
        <li>
          <span>프로필사진</span>
        </li>
        <li>
        <span>
            <img src={profil.value} alt="프로필 사진" />
        </span>
        </li>
        <li>
          <span>닉네임: {nickname.value}</span>
        </li>
        <li>
          <span>성별:  {gender.value ? <span>남자</span> :<span>여자</span>}</span>
        </li>
        <li>
          <span>출생 연도: {birth.value}</span>
        </li>
        <li>
          <span>고향: {myhometown}</span>
        </li>
        <li>
          <span>거주지: {myresidence}</span>
        </li>
        <li>
          <span>19대 대선 지지 후보: {myvote19.politician_name}</span>
          <div>
            <div className="candidata"
              style={{ backgroundImage: `url(${myvote19.politician_image})` }}
            />
          </div>
        </li>
        <li>
          <span>20대 대선 지지 후보: {myvote20.politician_name}</span>
          {/* <span>{voteContent}</span>
          <span>{voteDate}</span> */}
          <div>
            <div className="candidata"
              style={{ backgroundImage: `url(${myvote20.politician_image})` }}
            />
          </div>
        </li>
      </ul>

      <div className="btn_box">
        <button onClick={handlePrev}>{prev}</button>
        <button onClick={handleSubmit}>회원가입</button>
      </div>
    </StyledResult>
  );
};

export default Result;
