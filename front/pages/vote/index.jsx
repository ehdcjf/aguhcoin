import useBitControll from "../../hooks/useBitControll";
import { useEffect, useState } from "react";
import { showResult } from "../../components/api/vote";
import { Doughnut } from "react-chartjs-2";
import { list19 } from "../../public/list19";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../../components/vote/SearchForm";
import GenderSelect from "../../components/vote/GenderSelector";
import DoubleRangeSlider2 from '../../components/vote/DoubleRangeSlider2'
import AreaSelector from '../../components/vote/AreaSelector'
import VoteSelector from '../../components/vote/VoteSelector'
import {UpdateVote, UpdateVoteError} from '../../reducers/vote'
import useComplete from "../../hooks/useComplete"

const VotePage = () => {
  const dispatch = useDispatch();
  const vote = useSelector((state) => state.vote);
  const gender = useBitControll(0);
  const minage = useComplete(0);
  const maxage = useComplete(120);
  const hometown = useBitControll(0);
  const residence = useBitControll(0);
  const vote19 = useBitControll(0);

  useEffect(async () => {
    const data = { ...vote };
    const result = await showResult(data);
    if (result.success) {
      dispatch(UpdateVote(result))
      gender.onInit(data.gender);
      minage.onComplete(data.minage);
      maxage.onComplete(data.maxage);
      hometown.onInit(data.hometown);
      residence.onInit(data.residence);
      vote19.onInit(data.vote19);
    } else {
      alert(result.error);
    }
    console.log(data)
  }, []);

  // const legend = {
  //   display: true,
  //   labels: {
  //     fontColor: "black",
  //   },
  //   position: "top", //label를 넣어주지 않으면 position이 먹히지 않음
  // };


 const handleSubmit = async()=>{
   const data = {
    gender : gender.value,
    minage : minage.value,
    maxage : maxage.value,
    hometown : hometown.value,
    residence : residence.value,
    vote19 : vote19.value,
   }
   const result = await showResult(data);
    if (result.success) {
      dispatch(UpdateVote(result))
    } else {
      if(result.error=='zero'){
        dispatch(UpdateVoteError());

      }else{
        alert(result.error);
      }
    }
 }




  return (
    <>
      <div>
        <SearchForm>
          <GenderSelect {...gender}/>
          <DoubleRangeSlider2 left={minage.value} right={maxage.value} handleLeft={minage.onComplete} handleRight={maxage.onComplete} min={0} max={120}/>
          <AreaSelector  title='고향' {...hometown}/>
          <AreaSelector title='거주지' {...residence}/>
          <VoteSelector {...vote19}/>
          <button onClick={handleSubmit}>검색</button>
        </SearchForm>
        {!vote.error
        ?<div style={{ width: "500px", height: "500px" }}>
          <Doughnut data={vote.voteData} />
        </div>
        : <div>
          조건을 만족하는 결과가 없습니다. 
        </div>
        }
        
      </div>
    </>
  );
};

export default VotePage;
