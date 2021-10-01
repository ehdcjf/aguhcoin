import React, { useContext } from "react";
import CommentItem from "./CommentItem";
import { useState, useEffect } from "react";
import { showComment } from "../api/Comment";
import { useSelector, useDispatch } from "react-redux";
import { AddReply } from "../../reducers/comment";
// import Store from "./Store/context";

const ReplyList = (props) => {
  const { master } = props;
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.article);
  const { list } = useSelector((state) => state.comment);
  const [fetching, setFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [list, setList] = useState([]);
  useEffect(async () => {
    const data = {
      board_id: id,
      skip: skip,
      master: master,
    };
    const result = await showComment(data);
    dispatch(AddReply(result));
    setSkip(skip + 10);
  }, []);

  const fetchMoreComment = async () => {
    setFetching(true);
    const data = {
      board_id: id,
      skip: skip,
      master: master,
    };
    const result = await showComment(data);

    dispatch(AddReply(result));

    setFetching(false);
  };

  const Item = list.map((v, i) => {
    if (v.master == master)
      return (
        <CommentItem
          key={i}
          id={v.id}
          image={v.image}
          nickname={v.nick}
          writer={v.writer}
          content={v.content}
          master={v.master}
          board_id={v.board_id}
          date={v.createdAt}
          liked={v.liked}
          disliked={v.disliked}
          isUpdate={v.isUpdate}
          reply={v.reply}
          subidx={v.subidx}
          subnick={v.subnick}
          isLike={v.isLike}
          isWriter={v.isWriter}
          isReply={isReply}
        />
      );
  });

  // if (loadding) return <li>로딩중입니다^^</li>;
  // if (error) return <li>에러!!</li>;
  return (
    <>
      <li>{Item}</li>
      <span>답글 더보기</span>
    </>
  );
};

export default ReplyList;
