import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  GetReplys,
  ClearReplys,
  DeleteComment,
  DeleteReply,
} from "../../reducers/article";
import { destroyComment, showComment } from "../api/Comment";
import UpdateForm from "./CommentUpdateForm";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import styled from "styled-components";
import { LikeBtn } from "../board/LikeBtn";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import Router from "next/router";

const StyledCommentItem = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  margin: 10px 0;
  & > .image {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
  }

  & > ul {
    float: left;
    width: 85%;
    height: auto;
    overflow: hidden;
  }
`;

const CommentItem = ({
  board_id,
  comment_id,
  image,
  writer_nick,
  writer,
  content,
  root,
  createdAt,
  updated,
  liked,
  disliked,
  reply_cnt,
  target_id,
  target_nick,
  isLike,
  isWriter,
}) => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  const { nickname, IsLogin } = useSelector((state) => state.user);
  const [update, setUpdate] = useState(false);
  const [createReply, setCreateReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [skip, setSkip] = useState(0);

  const formRoot = root == 0 ? comment_id : root;
  const TARGET_ID = root == 0 ? null : writer;
  const TARGET_NICK = root == 0 ? null : writer_nick;

  const handleUpdate = (value) => {
    setUpdate(value);
  };

  const handleCreate = (value) => {
    setCreateReply(value);
  };

  const handleShow = async (value) => {
    setTimeout(setShowReply(value));
    // if(value){
    //답글불러오기
    const data = {
      board_id: article.board_id,
      skip: skip,
      root: comment_id,
      type: "old",
    };
    const result = await showComment(data);
    if (result.length > 0) {
      dispatch(GetReplys(result));
      setSkip(skip + 10);
    }
    // }else{
    //   dispatch(ClearReplys(comment_id))
    //   setSkip(0)
    // }
  };

  const handleDelete = async () => {
    if (IsLogin) {
      const answer = confirm("삭제하시겠습니까?");
      if (answer) {
        const data = { comment_id: comment_id, writer: writer };
        const result = await destroyComment(data);
        if (result.success) {
          if (root == 0) {
            dispatch(DeleteComment(comment_id));
          } else {
            dispatch(DeleteReply({ comment_id, root }));
          }
        } else {
          alert(result.error);
        }
      }
    } else {
      if (confirm("로그인하시겠습니까?")) {
        Router.push(`${KAKAO_AUTH_URL}`);
      }
    }
  };

  return (
    <>
      <StyledCommentItem>
        <div
          className="image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        <ul>
          <li>
            <Link href="/user/info/:id" as={`/user/info/${writer}`}>
              <a>{writer_nick}</a>
            </Link>
            <span>{createdAt}</span>
            {updated && <span>(수정됨)</span>}
            {isWriter && (
              <>
                <button onClick={() => handleUpdate(!update)}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
          </li>
          {update ? (
            <UpdateForm
              content={content}
              handleUpdate={handleUpdate}
              comment_id={comment_id}
              root={root}
              writer={writer} //확인용.
            />
          ) : (
            <li>
              {target_nick && (
                <Link href="/user/info/:id" as={`/user/info/${target_id}`}>
                  <a>@{target_nick}</a>
                </Link>
              )}
              {content}
            </li>
          )}

          <li>
            <LikeBtn
              root={root}
              liked={liked}
              disliked={disliked}
              isLike={isLike}
              type={"clike"}
              id={comment_id}
            />

            {createReply === false ? (
              <span
                onClick={() => {
                  handleCreate(true);
                }}
              >
                답글쓰기
              </span>
            ) : (
              <span
                onClick={() => {
                  handleCreate(false);
                }}
              >
                답글쓰기 취소
              </span>
            )}
          </li>
          {createReply && (
            <CommentForm
              root={formRoot}
              target_id={TARGET_ID}
              target_nick={TARGET_NICK}
              handleCreate={handleCreate}
              handleShow={handleShow}
            />
          )}
          {parseInt(reply_cnt) > 0 && (
            <li>
              <>
                {showReply === false ? (
                  <span
                    onClick={() => {
                      handleShow(true);
                    }}
                  >
                    답글 {reply_cnt}개 보기
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      handleShow(false);
                    }}
                  >
                    답글 숨기기
                  </span>
                )}
              </>
            </li>
          )}
          {showReply && (
            <li>
              <ul>
                <CommentList root={comment_id} />
              </ul>
            </li>
          )}
        </ul>
      </StyledCommentItem>
    </>
  );
};

export default CommentItem;
