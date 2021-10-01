import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComment } from "../api/Comment";
import { UpdateComment, UpdateReply } from "../../reducers/article";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import Router from "next/router";
const UpdateForm = ({ content, handleUpdate, comment_id, writer, root }) => {
  const dispatch = useDispatch();
  const { IsLogin } = useSelector((state) => state.user);
  const [input, setInput] = useState(content);

  const handleChange = (e) => {
    const { value } = { ...e.target };
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (IsLogin) {
      const data = {
        comment_id: comment_id,
        content: input,
        writer: writer,
      };
      setInput("");
      handleUpdate(false);
      const result = await updateComment(data);
      if (result.success) {
        const updateInfo = {
          comment_id: comment_id,
          content: input,
          root: root,
        };
        console.log(updateInfo);
        console.log(root);
        if (root == 0) {
          dispatch(UpdateComment(updateInfo));
        } else {
          dispatch(UpdateReply(updateInfo));
        }
        alert("수정되었습니다.");
      } else {
        alert(result.error);
      }
    } else {
      if (confirm("로그인하시겠습니까?")) {
        Router.push(`${KAKAO_AUTH_URL}`);
      }
    }
  };

  return (
    <li className="comment-form">
      <form onSubmit={handleSubmit}>
        <span className="ps_box">
          <input
            type="text"
            className="int"
            // placeholder="댓글을 입력해주세요."
            onChange={handleChange}
            value={input}
          />
        </span>
        <div>
          <button type="submit" className="btn">
            등록
          </button>
          <button
            onClick={() => {
              handleUpdate(false);
            }}
          >
            취소
          </button>
        </div>
      </form>
    </li>
  );
};

export default UpdateForm;
