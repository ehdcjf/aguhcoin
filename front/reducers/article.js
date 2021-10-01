
const initialState = {
  loadding: true,
  board_id: null,
  writer: null,
  subject: null,
  nickname: null,
  createdAt: null,
  update: null,
  hit: null,
  content: null,
  isLike: null,
  liked: 0,
  disliked: 0,
  del: null,
  isWriter: false,
  comment_cnt: 0,
  comments: [],
  comment_type:'like',
  skip:0,

}


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
  target_idx: null,
  target_nick: null,
  isWriter: true,
  isLike: null,
  replys: [],
  skip:0,
}




const SHOW_ARTICLE_REQUEST = 'SHOW_ARTICLE_REQUEST'
const SHOW_ARTICLE_SUCCESS = 'SHOW_ARTICLE_SUCCESS'
const SHOW_ARTICLE_ERROR = 'SHOW_ARTICLE_ERROR'

const INSERT_B_LIKE_ACTION = 'INSERT_B_LIKE_ACTION'
const INSERT_B_DISLIKE_ACTION = 'INSERT_B_DISLIKE_ACTION'
const DELETE_B_LIKE_ACTION = 'DELETE_B_LIKE_ACTION'
const DELETE_B_DISLIKE_ACTION = 'DELETE_B_DISLIKE_ACTION'
const UPDATE_B_LIKE_ACTION = 'UPDATE_B_LIKE_ACTION'
const UPDATE_B_DISLIKE_ACTION = 'UPDATE_B_DISLIKE_ACTION'

const INSERT_C_LIKE_ACTION = 'INSERT_C_LIKE_ACTION'
const INSERT_C_DISLIKE_ACTION = 'INSERT_C_DISLIKE_ACTION'
const DELETE_C_LIKE_ACTION = 'DELETE_C_LIKE_ACTION'
const DELETE_C_DISLIKE_ACTION = 'DELETE_C_DISLIKE_ACTION'
const UPDATE_C_LIKE_ACTION = 'UPDATE_C_LIKE_ACTION'
const UPDATE_C_DISLIKE_ACTION = 'UPDATE_C_DISLIKE_ACTION'

const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE'

const ADD_COMMENT = 'ADD_COMMENT';
const GET_COMMENTS = 'GET_COMMENTS';
const Add_REPLY = 'Add_REPLY';
const GET_REPLYS = 'GET_REPLYS';
const CLEAR_REPLYS = 'CLEAR_REPLYS';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_REPLY = 'DELETE_REPLY';
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const UPDATE_REPLY = 'UPDATE_REPLY'






export const ShowArticleAction = (data) => {
  return async (dispatch) => {
    dispatch(ShowArticleRequest());
    try {
      data.success === true
        ? dispatch(ShowArticleSuccess(data))
        : dispatch(ShowArticleError())
    } catch (e) {
      dispatch(ShowArticleError())
    }
  }
}

export const ShowArticleRequest = () => {
  return {
    type: SHOW_ARTICLE_REQUEST,
  }
}
export const ShowArticleSuccess = (data) => {
  return {
    type: SHOW_ARTICLE_SUCCESS,
    data: data,
  }
}
export const ShowArticleError = () => {
  return {
    type: SHOW_ARTICLE_ERROR,
  }
}

export const InsertBLikeAction = (data) => {
  if (data) {
    return {
      type: INSERT_B_LIKE_ACTION,
      data: data,
    }
  } else {
    return {
      type: INSERT_B_DISLIKE_ACTION,
      data: data,
    }
  }
}

export const DeleteBLikeAction = (data) => {
  if (data) {
    return {
      type: DELETE_B_LIKE_ACTION,

    }
  } else {
    return {
      type: DELETE_B_DISLIKE_ACTION,

    }
  }
}

export const UpdateBLikeAction = (data) => {
  if (data) {
    return {
      type: UPDATE_B_LIKE_ACTION,
    }
  } else {
    return {
      type: UPDATE_B_DISLIKE_ACTION,

    }
  }
}
export const InsertCLikeAction = (data) => {

  if (data.isLike) {
    return {
      type: INSERT_C_LIKE_ACTION,
      data: data,
    }
  } else {
    return {
      type: INSERT_C_DISLIKE_ACTION,
      data: data,
    }
  }
}

export const DeleteCLikeAction = (data) => {

  if (data.isLike) {
    return {
      type: DELETE_C_LIKE_ACTION,
      data:data
    }
  } else {
    return {
      type: DELETE_C_DISLIKE_ACTION,
      data:data,
    }
  }
}

export const UpdateCLikeAction = (data) => {
  if (data.isLike) {
    return {
      type: UPDATE_C_LIKE_ACTION,
      data:data
    }
  } else {
    return {
      type: UPDATE_C_DISLIKE_ACTION,
      data:data

    }
  }
}





export const AddComment = (data) => {

  return {
    type: ADD_COMMENT,
    data: data,
  }
}

export const GetComments = (data) => {
  return {
    type: GET_COMMENTS,
    data: data
  }
}

export const AddReply = (data) => {
  return {
    type: Add_REPLY,
    data: data
  }
}

export const GetReplys = (data) => {
  return {
    type: GET_REPLYS,
    data: data,
  }
}

export const ClearReplys = (data) => {
  return {
    type: CLEAR_REPLYS,
    data: data,
  }
}

export const UpdateComment = (data) => {
  return {
    type: UPDATE_COMMENT,
    data: data,
  }
}

export const UpdateReply = (data) => {
  return {
    type: UPDATE_REPLY,
    data: data,
  }
}


export const DeleteComment = (data) => {
  return {
    type: DELETE_COMMENT,
    data: data,
  }
}

export const DeleteReply = (data) => {
  return {
    type: DELETE_REPLY,
    data: data,
  }
}


export const ChangeCommentType = (data)=>{
  console.log(data);
  return {
    type:CHANGE_COMMENT_TYPE,
    data:data,
  }
}



const reducer = (state = initialState, action) => {

  switch (action.type) {

    case SHOW_ARTICLE_REQUEST:
      return {
        ...state,
        loadding: true,

      }
    case SHOW_ARTICLE_SUCCESS:
      return {
        ...state,
        ...action.data,
        skip:10,
        loadding: false,
      }
    case SHOW_ARTICLE_ERROR:
      return {
        ...state,
        loadding: false,
      }
    case INSERT_B_LIKE_ACTION:
      return {
        ...state,
        isLike: true,
        liked: state.liked + 1,
      }
    case INSERT_B_DISLIKE_ACTION:
      return {
        ...state,
        isLike: false,
        disliked: state.disliked + 1,
      }
    case DELETE_B_LIKE_ACTION:
      return {
        ...state,
        isLike: null,
        liked: state.liked - 1,
      }
    case DELETE_B_DISLIKE_ACTION:
      return {
        ...state,
        isLike: null,
        disliked: state.disliked - 1,
      }
    case UPDATE_B_LIKE_ACTION:
      return {
        ...state,
        isLike: true,
        liked: state.liked + 1,
        disliked: state.disliked - 1,
      }
    case UPDATE_B_DISLIKE_ACTION:
      return {
        ...state,
        isLike: false,
        liked: state.liked - 1,
        disliked: state.disliked + 1,
      }


    case INSERT_C_LIKE_ACTION:
      if(action.data.root==0){
        const comments = [...state.comments]
        comments.forEach(v=>{
          if(v.comment_id==action.data.comment_id){
            v.isLike=true;
            v.liked++;
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }else{
        const comments = [...state.comments];
        comments.forEach(c=>{
          if(c.comment_id==action.data.root){
            c.replys.forEach(r=>{
              if(r.comment_id==action.data.comment_id){
                r.isLike=true;
                r.liked++;
              }
            })
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }


    case INSERT_C_DISLIKE_ACTION:
      if(action.data.root==0){
        const comments = [...state.comments]
        comments.forEach(v=>{
          if(v.comment_id==action.data.comment_id){
            v.isLike=false;
            v.disliked++;
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }else{
        const comments = [...state.comments];
        comments.forEach(c=>{
          if(c.comment_id==action.data.root){
            c.replys.forEach(r=>{
              if(r.comment_id==action.data.comment_id){
                r.isLike=false;
                r.disliked++;
              }
            })
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }


    case DELETE_C_LIKE_ACTION:
     if(action.data.root==0){
        const comments = [...state.comments]
        comments.forEach(v=>{
          if(v.comment_id==action.data.comment_id){
            v.isLike=null;
            v.liked--;
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }else{
        const comments = [...state.comments];
        comments.forEach(c=>{
          if(c.comment_id==action.data.root){
            c.replys.forEach(r=>{
              if(r.comment_id==action.data.comment_id){
                r.isLike=null;
                r.liked--;
              }
            })
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }

    case DELETE_C_DISLIKE_ACTION:
      if(action.data.root==0){
        const comments = [...state.comments]
        comments.forEach(v=>{
          if(v.comment_id==action.data.comment_id){
            v.isLike=null;
            v.disliked--;
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }else{
        const comments = [...state.comments];
        comments.forEach(c=>{
          if(c.comment_id==action.data.root){
            c.replys.forEach(r=>{
              if(r.comment_id==action.data.comment_id){
                r.isLike=null;
                r.disliked--;
              }
            })
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }
    case UPDATE_C_LIKE_ACTION:
      if(action.data.root==0){
        const comments = [...state.comments]
        comments.forEach(v=>{
          if(v.comment_id==action.data.comment_id){
            v.isLike=true;
            v.disliked--;
            v.liked++;
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }else{
        const comments = [...state.comments];
        comments.forEach(c=>{
          if(c.comment_id==action.data.root){
            c.replys.forEach(r=>{
              if(r.comment_id==action.data.comment_id){
                r.isLike=true;
                r.disliked--;
                r.liked++;
              }
            })
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }

    case UPDATE_C_DISLIKE_ACTION:
      if(action.data.root==0){
        const comments = [...state.comments]
        comments.forEach(v=>{
          if(v.comment_id==action.data.comment_id){
            v.isLike=false;
            v.disliked++;
            v.liked--;
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }else{
        const comments = [...state.comments];
        comments.forEach(c=>{
          if(c.comment_id==action.data.root){
            c.replys.forEach(r=>{
              if(r.comment_id==action.data.comment_id){
                r.isLike=false;
                r.disliked++;
                r.liked--;
              }
            })
          }
        })
        return {
          ...state,
          comments:comments,
        }
      }

    case ADD_COMMENT:
      const newComment = { ...defaultComment, ...action.data }
      return {
        ...state,
        comments: [newComment, ...state.comments],
        comment_cnt: state.comment_cnt + 1,
      }

    ///중복되는거 아래 replys에서 제거한거처럼 제거해주기.
    case GET_COMMENTS:
      let tempComments = [...state.comments, ...action.data];
      // const comments=[];
      // const commentCheck = [];
      // for(let i = 0; i<tempComments.length; i++){
      //   if(!commentCheck.includes(tempComments[i].comment_id)){
      //     commentCheck.push(tempComments[i].comment_id)
      //     comments.push(tempComments[i])
      //   }
      // }
      return {
        ...state,
        comments: tempComments,
        skip:state.skip+10,
      }

    case Add_REPLY:
      const newReply = { ...defaultComment, ...action.data }
      let replytemp = [...state.comments];
      replytemp.forEach(v => {
        if (v.comment_id == action.data.root) {
          v.replys = [newReply, ...v.replys];
          v.reply_cnt = v.reply_cnt + 1;
        }
      })
      return {
        ...state,
        comments: replytemp,
        comment_cnt: state.comment_cnt + 1,
      }

    case GET_REPLYS:
      const root = action.data[0].root
      let replystemp = [...state.comments];
      replystemp.forEach(v => {
        if (v.comment_id == root) {
          v.replys = [...v.replys, ...action.data];
          let check = [];
          let replys = [];
          for (let i = 0; i < v.replys.length; i++) {
            if (!check.includes(v.replys[i].comment_id)) {
              check.push(v.replys[i].comment_id)
              replys.push(v.replys[i])
            }
          }
          v.replys = replys
        }
      })
      return {
        ...state,
        comments: replystemp,
      }

    case UPDATE_COMMENT:
      let updateComments = [...state.comments]
      updateComments.forEach(c => {
        if (c.comment_id == action.data.comment_id) {
          c.updated = true;
          c.content = action.data.content
        }
      })
      return {
        ...state,
        comments: updateComments
      }

    case UPDATE_REPLY:
      let updateReply = [...state.comments]
      updateReply.forEach(c => {
        if (c.comment_id == action.data.root) {
          c.replys.forEach(r => {
            if (r.comment_id == action.data.comment_id) {
              r.updated = true;
              r.content = action.data.content;
            }
          })
        }
      })

      return {
        ...state,
        comments: updateReply,
      }




    case CLEAR_REPLYS:
      let clearReplys = [...state.comments];
      clearReplys.forEach(v => {
        if (v.comment_id == action.data) {
          v.replys = [];
        }
      })
      return {
        ...state,
        comments: clearReplys,
      }

    case DELETE_COMMENT:
      let dltComments = [...state.comments]
      dltComments.forEach(c => {
        if (c.comment_id == action.data) {
          c.del = 1;
          c.content = '삭제된 댓글입니다.'
          c.isWriter = false;
        }
      })
      return {
        ...state,
        comments: dltComments
      }

    case DELETE_REPLY:
      let dltReply = [...state.comments]
      dltReply.forEach(c => {
        if (c.comment_id == action.data.root) {
          c.replys.forEach(r => {
            if (r.comment_id == action.data.comment_id) {
              r.del = 1;
              r.content = '삭제된 댓글입니다.';
              r.isWriter = false;
            }
          })
        }
      })
      return {
        ...state,
        comments: dltReply,
      }

      case CHANGE_COMMENT_TYPE:
        console.log(action.data);
        return {
          ...state,
          comments:[...action.data.comments],
          comment_type:action.data.type,
          skip:action.data.comments.length,
        }



    default:
      return state
  }
}

export default reducer