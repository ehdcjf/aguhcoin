import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../api/Comment";
import { AddComment, AddReply } from "../../reducers/article";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import Router from "next/router";

const StyledCommentForm = styled.div`
  width: 100%;
  height: 80px;
  padding-bottom: 20px;
  & > .image {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
  }

  & > .content {
    float: left;
    width: 90%;
    height: 90px;

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

const CommentForm = ({
  handleCreate,
  handleShow,
  root,
  target_id,
  target_nick,
}) => {
  const dispatch = useDispatch();
  const { image, nickname } = useSelector((state) => state.user);
  const article = useSelector((state) => state.article);
  const [input, setInput] = useState("");
  const TARGET_ID = target_id == null ? 0 : target_id;
  const handleChange = (e) => {
    const { value } = { ...e.target };
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      board_id: article.board_id,
      content: input,
      root: root,
      target_id: TARGET_ID,
    };

    const result = await createComment(data);
    console.log(result);

    if (result.success) {
      const commentInfo = {
        board_id: article.board_id,
        comment_id: result.comment_id,
        writer: result.writer,
        writer_nick: nickname,
        content: input,
        root: root,
        createdAt: result.createdAt,
        image: image,
        target_id: target_id,
        target_nick: target_nick,
      };
      if (root == 0) {
        dispatch(AddComment(commentInfo));
      } else {
        dispatch(AddReply(commentInfo));
      }
    } else {
      if (result.error === "!USER") {
        if (confirm("로그인하시겠습니까?")) {
          Router.push(`${KAKAO_AUTH_URL}`);
        }
      } else {
        alert(result.error);
      }
    }

    setInput("");
    if (handleCreate != undefined) {
      handleShow(true);
      setTimeout(handleCreate(false));
    }
    //
  };

  return (
    <StyledCommentForm>
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
      <form className="content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          style={{ border: "none", borderRight: "0px", borderLeft: "0px" }}
          onChange={handleChange}
          value={input}
        />
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
