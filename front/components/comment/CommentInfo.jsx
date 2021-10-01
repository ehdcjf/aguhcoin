import { useSelector,useDispatch } from "react-redux";
import { showComment } from "../api/Comment";
import { ChangeCommentType } from "../../reducers/article";

const CommentInfo = () => {
  const article = useSelector(state=>state.article);
  const dispatch = useDispatch(); 
  const handleType = async(e) =>{
    const comment_type = e.target.value
    const data = {
      board_id:article.board_id,
      skip:0,
      root:0,
      type:comment_type,
    }
    const result = await showComment(data);
      
    if (result.length > 0) {
      const data = {
        comments:result,
        type:comment_type,
      }
      console.log(data);
      dispatch(ChangeCommentType(data))
    }


  }


  return (
    <div>
      <span>댓글 {article.comment_cnt}개</span>
      <select name="" id="" onChange={handleType} value={article.comment_type}> 
        <option value="like">인기순</option>
        <option value="new">최근 날짜순</option>
        <option value="old">오래된 날짜순</option>
      </select>
    </div>
  );
}

export default CommentInfo;