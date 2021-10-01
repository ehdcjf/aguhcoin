import React, { useContext } from "react";
import CommentItem from "./CommentItem";
import { useState, useEffect } from "react";
import { showComment } from "../api/Comment";
import { useSelector, useDispatch } from "react-redux";
import { GetComments } from "../../reducers/article";

const CommentList = ({ root }) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  const [fetching, setFetching] = useState(false);

  //클린업함수..
  useEffect(() => {
    return () => {
      setFetching(false);
    };
  }, []);

  const fetchMoreComment = async () => {
    console.log(article.comment_type)
    setFetching(true);
    const data = {
      board_id: article.board_id,
      skip: article.skip,
      root: root,
      type: article.comment_type,
    };
    const result = await showComment(data);
    setFetching(false);
    dispatch(GetComments(result));
  };

  // const { loadding, commentItem, error } = state;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      fetching === false &&
      root == 0
    ) {
      fetchMoreComment();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const randerItem = () => {
    let temp = article.comments;
    if (root != 0) {
      article.comments.forEach((v) => {
        if (v.comment_id == root) {
          temp = v.replys;
        }
      });
    }
    return temp.map((v, i) => {
      return (
        <CommentItem
          key={v.createdAt + `${i}`}
          board_id={v.board_id}
          comment_id={v.comment_id}
          image={v.image}
          writer_nick={v.writer_nick}
          writer={v.writer}
          content={v.content}
          root={v.root}
          createdAt={v.createdAt}
          liked={v.liked}
          disliked={v.disliked}
          updated={v.updated}
          replys={v.replys}
          reply_cnt={v.reply_cnt}
          target_id={v.target_id}
          target_nick={v.target_nick}
          isLike={v.isLike}
          isWriter={v.isWriter}
        />
      );
    });
  };

  // if (loadding) return <li>로딩중입니다^^</li>;
  // if (error) return <li>에러!!</li>;
  return <li>{randerItem()}</li>;
};

export default CommentList;
