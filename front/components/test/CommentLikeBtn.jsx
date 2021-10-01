  import { useEffect, useState } from "react";
  import { likeAction } from "../api/like";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import Router from "next/router";



    import {
      AiFillDislike,
      AiFillLike,
      AiOutlineDislike,
      AiOutlineLike,
    } from "react-icons/ai";
    import styled from 'styled-components';
import { useSelector } from "react-redux";
    
    const StyledBoardLikeBtn = styled.div`
    width: 15vw;
    display: flex;
    justify-content: center;
    
    `
    
    export const CommentLikeBtn = (props) => {
      const {type,id} = props
        const [liked,setLike] = useState(props.liked);
        const [disliked,setDisLike] = useState(props.disliked);
        const [isLike,setIsLike] = useState(props.isLike)
        const {IsLogin} = useSelector(state=>state.user)

      const handleOutlineLike = (value) => {
        if(IsLogin){

          if (isLike == null) {
            handleInsert(value);
          } else {
            handleUpdate(value);
          }
        }else{
          if(confirm('로그인하시겠습니까?')){
            Router.push(`${KAKAO_AUTH_URL}`)
          }
        }
      };
    

      const handleInsert = async (value) => {
        const data = {
          id: id,
          isLike: value,
          type: type,
          action: "INSERT",
        };
    
        const result = await likeAction(data);
        console.log(result)
        if(result.success){
            setIsLike(result.isLike)
            if(result.isLike){
              //좋아요 눌렀을 떄, 
              setLike(liked+1)
            }else{
              // 싫어요 눌렀을 때. 
              setDisLike(disliked+1)
            }
        }
      };
    
      const handleDelete = async (value) => {
        const data = {
          id: id,
          type: type,
          action: "DELETE",
        };
        const result = await likeAction(data);
        console.log(result)

        if(result.success){
          if(isLike){
            //좋아요 눌렀을 떄, 
            setLike(liked-1)
          }else{
            // 싫어요 눌렀을 때. 
            setDisLike(disliked-1)
          }
          setIsLike(null)
        };

      }
    
      const handleUpdate = async (value) => {
        const data = {
          id: id,
          isLike: value,
          type: type,
          action: "UPDATE",
        };
    
        const result = await likeAction(data);
        console.log(result)

        if(result.success){
            if(result.isLike){
              setIsLike(true)
              //좋아요 눌렀을 떄, 
              setLike(liked+1)
              setDisLike(disliked-1)
            }else{
              // 싫어요 눌렀을 때.
              setIsLike(false) 
              setLike(liked-1)
              setDisLike(disliked+1)
            }
        }
        
      };
    
      return (
        <StyledBoardLikeBtn>
          <div>
    
          {isLike == true ? (
            <span
            onClick={() => {
              handleDelete(true);
            }}
            >
              <AiFillLike />
            </span>
          ) : (
            <span
            onClick={() => {
              handleOutlineLike(true);
            }}
            >
              <AiOutlineLike />
            </span>
          )}
          <span className="liked">{liked}</span>
          </div>
          <div>
          {isLike == false ? (
            <span
            onClick={() => {
              handleDelete(false);
            }}
            >
              <AiFillDislike />
            </span>
          ) : (
            <span
              onClick={() => {
                handleOutlineLike(false);
              }}
              >
              <AiOutlineDislike />
            </span>
          )}
          <span className="disliked">{disliked}</span>
          </div>
        </StyledBoardLikeBtn>
      );
    };
    

export default CommentLikeBtn;