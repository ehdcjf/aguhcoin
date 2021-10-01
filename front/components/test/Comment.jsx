import CommentLayout from "./CommentLayout";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import CommentInfo from "./CommentInfo";
import { CommentCntUp } from "../../reducers/article";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  createComment,
  showComment,
  destroyComment,
  updateComment,
} from "../api/Comment";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import Router from "next/router";


const defaultComment = {
  board_id: null,
  comment_id: null,
  writer: null,
  writer_nick: null,
  content: null,
  root: 0,
  createdAt: null,
  image: null,
  nickname: null,
  liked: 0,
  disliked: 0,
  updated: false,
  reply_cnt: 0,
  target: 0,
  target_id: null,
  target_nick: null,
  isWriter: true,
  isLike: null,
}


const Comment = ({board_id}) => {
  const dispatch = useDispatch(); 
  const {image,nickname} = useSelector((state)=>state.user)
  const {comment_cnt} = useSelector((state)=>state.article)
  const [list, setList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [type,setType] = useState('like')


  const handleCommentType = async(v) =>{
      setType(v)
      const data = {
        board_id: board_id,
        skip: 0,
        root: 0,
        type:v,
      };
      const result = await showComment(data);
      console.log(result)
      const newList = [...result];
      
      setList(newList);
      setSkip(10);
  }


  


  //===== init

  ///=====CREATE
  const handleCreate = async (v) => {
    const data = {
      board_id: board_id,
      content: v.content,
      root:v.root,
    };
    const result = await createComment(data);
    if (result.success) {
      const commentInfo = {
        ...defaultComment,
        board_id: board_id,
        comment_id: result.comment_id,
        writer: result.writer,
        writer_nick: nickname,
        content: v.content,
        root: v.root,
        createdAt: result.createdAt,
        image: image,
      };
        const newList = [commentInfo, ...list];
        setList(newList);
        dispatch(CommentCntUp())      
    }
    else{
      if(result.error==='!USER'){
        if(confirm('로그인하시겠습니까?')){
          Router.push(`${KAKAO_AUTH_URL}`)
        }
      }else{
        alert(result.error)
      }
    }
  };

  //======READ

  useEffect(async () => {
    const data = {
      board_id: board_id,
      skip: skip,
      root: 0,
      type:type,
    };
    const result = await showComment(data);
    console.log(result)

    const newList = [...list, ...result];
    setList(newList);
    setSkip(skip + 10);
  }, []);

  //////==== infinity
  const fetchMoreComment = async () => {
    setFetching(true);
    const data = {
      board_id: board_id,
      skip: skip,
      root: 0,
      type:type,
    };
    const result = await showComment(data);
    const newList = [...list, ...result];
    setList(newList);
    setSkip(skip + 10);

    setFetching(false);
  };

  // const { loadding, commentItem, error } = state;




  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      fetchMoreComment();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //=====UPDATE
  const handleModify = async (data) => {
    const result = await updateComment(data);
    if (result.success) {
      const newList = [...list];
      newList.forEach((v) => {
        if (v.comment_id == data.comment_id) {
          v.content = data.content;
          v.update = true;
        }
      });
      setList(newList);
      alert("수정되었습니다.");
    } else {
      if(result.error==='!USER'){
        if(confirm('로그인하시겠습니까?')){
          Router.push(`${KAKAO_AUTH_URL}`)
        }
      }else{
        alert(result.error)
      }
    }
  };

  //====DELETE
  const handleDelete = async (data) => {
    const result = await destroyComment(data);
    if (result.success) {
      const newList = [...list];
      newList.forEach((v) => {
        if (v.comment_id == data.comment_id) {
          v.content = "삭제된 댓글입니다.";
          v.isWriter = false;
        }
      });
      setList(newList);
      alert("삭제되었습니다.");
    } else {
      if(result.error==='!USER'){
        if(confirm('로그인하시겠습니까?')){
          Router.push(`${KAKAO_AUTH_URL}`)
        }
      }else{
        alert(result.error)
      }
    }
  };

  return (
    <CommentLayout>
      <CommentInfo type={type} cnt={comment_cnt} handleCommentType={handleCommentType}/>
      <CommentForm root={0} handleCreate={handleCreate}  />
      <CommentList
        list={list}

        root={0}
        handleDelete={handleDelete}
        handleModify={handleModify}
      />
    </CommentLayout>
  );
};

export default Comment;
