import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import Router from "next/router";

const StyledCommentForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  
  & > .image {
    
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
  }

  & > .content {
    display: flex;
    align-items: flex-start;

    width: 90%;
    height: 90px;
    margin: 20px 0;

    & > input {
      display: block;
      width: 100%;
      height: 40px;
      font-size: 16px;
      border: none;
      border-bottom: 1px solid #666;
      background-color: transparent;

      &:focus {
        outline: none;
        background-color: #fff;
      }
    }

    & > .action_box {
      width: 100%;
      height: 40px;
      text-align: right;

      button {
        border: none;
        padding: 7px 14px;
      }

      .cancle_btn {
        background-color: #666;
      }

      .submit_btn {
        background-color: cyan;
      }
    }
  }
`;




const CommentForm = ({ handleCreate, root,showReplyMakeForm ,handleShow, target, target_nick, target_id} ) => {
  const {image,IsLogin} = useSelector((state)=>state.user)  
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    const { value } = { ...e.target };
    setInput(value);
  };

  const handleCheck = (e) =>{
    e.target.blur();
    if(confirm('로그인하시겠습니까?')){
      Router.push(`${KAKAO_AUTH_URL}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      content: input,
      root: root,
      
    };
    if(target!==undefined) {
      data.target = target
      data.target_id = target_id
      data.target_nick = target_nick
      
    }
    //댓글에 대한 답글..
    if(root!=0){
      showReplyMakeForm(false)
      handleShow(true)
    }

    //답글에 대한 답글은 따로 처리해야됨..
    


    // if (sub_master != undefined) data.sub_master = sub_master;
    handleCreate(data);
    setInput("");
    //
  };

  return (
    <StyledCommentForm>
    <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
    <form className="content" onSubmit={handleSubmit}>
      {IsLogin 
      ? <input
        type="text"
        placeholder="댓글을 입력해주세요."
        style={{ border: "none", borderRight: "0px", borderLeft: "0px" }}
        onChange={handleChange}
        value={input}
        />
      : <input
      type="text"
      placeholder="로그인해주세요."
      style={{ border: "none", borderRight: "0px", borderLeft: "0px" }}
      onFocus={handleCheck}
      />}
      
      <div className="action_box">
        <button className="cancle_btn">취소</button>
        <button type="submit" className="submit_btn">
          등록
        </button>
      </div>
    </form>
  </StyledCommentForm>
  );
};

export default CommentForm;
