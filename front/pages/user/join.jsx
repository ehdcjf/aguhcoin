import Head from "next/head";
import { useState, useEffect } from "react";
import { getLatestVote } from "../../components/api/vote";

import useComplete from "../../hooks/useComplete";
import Nickname from "../../components/user/Nickname";
import ProfilImage from "../../components/user/ProfilImage";
import Gender from "../../components/user/Gender";
import Birth from "../../components/user/Birth";
import Area from "../../components/user/Area";
import Vote from "../../components/user/Vote";
import { list19 } from "../../public/list19";
import Result from "../../components/user/Result";
import Router from "next/router";
import styled from "styled-components";

const StyledJoinLayout = styled.div`
  width: 100vw;
  height: 100vh;

  .title{
    width: 100vw;
    height: 10vh;
    margin-top:5vh ;
    font-size: 10vh;
    line-height: 10vh;
    text-align: center;
  }
`





const Join = () => {
  const [kakao, setKakao] = useState();
  const nickname = useComplete("");
  const gender = useComplete(null);
  const birth = useComplete(null);
  const hometown = useComplete(null);
  const residence = useComplete(null);
  const vote19 = useComplete(null);
  const vote20 = useComplete(null);
  const profil = useComplete("/defaultProfil.png");
  const [step, setStep] = useState(0);
  const [voteId, setVoteId] = useState(null);
  const [voteTitle, setVoteTitle] = useState(null);
  const [voteContent, setVoteContent] = useState(null);
  const [voteDate, setVoteDate] = useState(null);
  const [latestVote, setLatestVote] = useState([]);

  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get("id");
    setKakao(code);

    const result = await getLatestVote();
    if (result.success) {
      setVoteId(result.vote_id);
      setVoteTitle(result.title);
      setVoteContent(result.content);
      setVoteDate(result.createdAt);
      setLatestVote(result.list);
    }
  }, []);

  const handleStep = (data) => {
    setStep(data);
  };

  const handleCancle = () => {
    Router.push("/");
  };

  return (
    <StyledJoinLayout>
      <Head>
        <title>회원가입</title>
      </Head>

      <div className='title'>회원가입</div>
      <div className='content_box'>

      
    {step === 0 && (
        <Nickname
          {...nickname}
          title={"닉네임"}
          prev={"회원가입 취소"}
          next={"다음"}
          handlePrev={handleCancle}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 1 && (
        <ProfilImage
          {...profil}
          title={"프로필 사진"}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 2 && (
        <Gender
          {...gender}
          title={"성별"}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 3 && (
        <Birth
          {...birth}
          title={"출생 연도"}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 4 && (
        <Area
          {...hometown}
          title={"고향"}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 5 && (
        <Area
          {...residence}
          title={"거주지"}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 6 && (
        <Vote
          {...vote19}
          title={"19대 대선 지지 후보"}
          list={list19}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 7 && (
        <Vote
          {...vote20}
          title={voteTitle}
          list={latestVote}
          prev={"이전"}
          next={"다음"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
          handleNext={() => {
            handleStep(step + 1);
          }}
        />
      )}
      {step === 8 && (
        <Result
          kakao={kakao}
          list19={list19}
          list20={latestVote}
          nickname={nickname}
          gender={gender}
          birth={birth}
          hometown={hometown}
          residence={residence}
          vote19={vote19}
          vote20={vote20}
          profil={profil}
          voteId={voteId}
          latestVote={latestVote}
          voteTitle={voteTitle}
          voteContent={voteContent}
          voteDate={voteDate}
          prev={"이전"}
          handlePrev={() => {
            handleStep(step - 1);
          }}
        />
      )}
      </div>
    </StyledJoinLayout>
  );
};

export default Join;
