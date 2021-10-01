import { useEffect } from "react";
import CommentItem from "./CommentItem";


const CommentList = ({list,handleModify,root,handleDelete, OriginhandleCreate}) => {


  const renderItem = () =>{
    
    return list.map((v, i) => {  

      
      return (
        <CommentItem
          handleDelete={() => {
            handleDelete({ comment_id: v.comment_id, writer: v.writer });
          }}
          
          handleModify={handleModify}
          OriginhandleCreate={OriginhandleCreate}
          key={v.createdAt+`${i}`}
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
          reply_cnt={v.reply_cnt}
          target_id={v.target_id}
          target_nick={v.target_nick}
          isLike={v.isLike}
          isWriter={v.isWriter}
        />
      );
    });

  }
 

  // if (loadding) return <li>로딩중입니다^^</li>;
  // if (error) return <li>에러!!</li>;
  return <li>{renderItem()}</li>;
};

export default CommentList;
