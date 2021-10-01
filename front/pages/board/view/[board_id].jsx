import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showArticle, deleteArticle } from "../../../components/api/Article";
import { ShowArticleAction } from "../../../reducers/article";
import { DeleteArticleAction } from "../../../reducers/board";
import Comment from "../../../components/comment/Comment";
import Link from "next/link";
import Router from "next/router";

import { LikeBtn } from "../../../components/board/LikeBtn";
import Layout from "../../../containers/Layout";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";

import { RiFileListLine, RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const View = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  const { type, page, search, keyword, rows } = useSelector(
    (state) => state.board
  );
  const { IsLogin } = useSelector((state) => state.user);
  const router = useRouter();
  const { board_id } = router.query;

  const makeQuery = () => {
    let queryStr = `/board/list?type=${type}&rows=${rows}&page=${page}`;
    if (search !== null && keyword !== null)
      queryStr += `&search=${search}&keyword=${keyword}`;
    return queryStr;
  };

  useEffect(async () => {
    console.log(article.loadding);
    if (board_id !== undefined) {
      const data = { board_id: board_id };
      const result = await showArticle(data);
      dispatch(ShowArticleAction(result));
      console.log(article);
    }
  }, [board_id]);

  const deleteHandler = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const data = {
        board_id,
        writer: article.writer,
      };
      const result = await deleteArticle(data);
      if (result.success === true) {
        dispatch(DeleteArticleAction(result));
        const href = makeQuery();
        Router.push(href);
      } else {
        alert("당신에게는 이 글에 대한 삭제 권한이 없습니다.");
      }
    }
  };

  // const modifyHandler = () => {
  //   Router.push(
  //     {
  //       pathname: `/board/modify`,
  //       query: {
  //         id: id,
  //       },
  //     },
  //     `/board/modify?id=${id}`
  //   );
  // };

  const moveList = () => {
    const href = makeQuery();
    Router.push(href);
  };

  const renderArticleAction = () => {
    if (article.del === 0 && article.isWriter === true && IsLogin) {
      return (
        <>
          <Link
            href="/board/:[editor]"
            as={`/board/modify?board_id=${article.board_id}`}
          >
            <a>
              <GrUpdate />
              수정
            </a>
          </Link>
          <span> | </span>
          {/* <button onClick={modifyHandler}>
            <GrUpdate />
            수정
          </button> */}
          <span onClick={deleteHandler}>
            <RiDeleteBin6Line />
            삭제
          </span>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" src="../../style/style.css" />
        <link
          href="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css"
          rel="stylesheet"
        />
        <script src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script>
        <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css"
        />
        <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
      </Head>
      <Layout>
        <h1 className="title">{article.subject}</h1>
        <div className="article_info">
          <div className="article_info_left">
            <span className="writer">
              <Link
                href="/user/s:[user_id]"
                as={`/user/${article.writer}`}
              >
                <a>{article.nickname}</a>
              </Link>
            </span>
            <span className="createdAt">{article.createdAt}</span>
          </div>
          <div className="article_info_right">
            <span className="article-hit">조회수: {article.hit}</span>
          </div>
        </div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <LikeBtn
          isLike={article.isLike}
          type={"blike"}
          id={article.board_id}
          liked={article.liked}
          disliked={article.disliked}
        />
        <div>
          {renderArticleAction()}
          <span onClick={moveList}>
            <RiFileListLine /> 목록
          </span>
        </div>
        {/* 댓글영역 */}
        {/* <div>{board_id !== undefined && <Comment board_id={board_id} comment_cnt={article.comment_cnt}/>}</div> */}
        <Comment />
      </Layout>
    </>
  );
};

export default View;
