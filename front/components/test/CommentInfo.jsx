

const CommentInfo = ({cnt,handleCommentType,type}) => {
  
  

  const handleType=(e)=>{
    handleCommentType(e.target.value);
  }
  
  return (
    <div>
      <span>댓글 {cnt}개</span>
      <select name="" id="" onChange={handleType} value={type}> 
        <option value="like">인기순</option>
        <option value="new">최근 날짜순</option>
        <option value="old">오래된 날짜순</option>
      </select>
    </div>
  );
}



export default CommentInfo;