
const initialState = {
  comment: [],
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
}



const ADD_COMMENT = 'ADD_COMMENT';
const ADD_COMMENTS = 'ADD_COMMENTS';

const RESET_COMMENT = 'RESET_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT'


export const AddComment = (data) => {

  return {
    type: ADD_COMMENT,
    data: data,
  }
}


export const AddComments = (data) => {

  return {
    type: ADD_COMMENTS,
    data: data,
  }
}

export const AddReplys = (data) => {

  return {
    type: ADD_REPLYS,
    data: data,
  }
}

export const ResetComment = ()=>{
  return {
    type:RESET_COMMENT,
  }
}

export const UpdateComment = (data)=>{
  return {
    type:UPDATE_COMMENT,
    data:data,
  }
}



export const DeleteComment = (data) =>{
  return {
    type:DELETE_COMMENT,
    data:data
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case RESET_COMMENT:
      return {
        ...initialState
      }


    case ADD_COMMENT:
      if (action.data.root === 0) {
        const originComments = state.comment;
        const comment = {
          ...defaultComment, ...action.data,
        }
        const newComments = [comment, ...originComments];
        return {
          ...state,
          comment: newComments,
        }

      } else {
        let templist = [...state.comment]
        const newReply = {
          ...defaultComment, ...action.data,
        }
        templist.forEach(v => {
          if (v.comment_id == action.data.root) {
            v.replys = [newReply, ...v.replys]
            v.reply_cnt = v.reply_cnt + 1;
          }
        })
        return {
          ...state,
          comment:templist,
        }
      }

    case ADD_COMMENTS:
      const addedComments = [...state.comment, ...action.data]
      return {
        ...state,
        comment: addedComments,
      }
    
    case UPDATE_COMMENT:
      let updatedComment = [...state.comment];
      updatedComment.forEach(v=>{
        if(v.comment_id==action.data.comment_id){
          v.content = action.data.content;
          v.updated=true;
        }
      })
      return{
        ...state,
        comment:[...updatedComment]
      }



    case DELETE_COMMENT:
      console.log(action.data);
      let temp = [...state.comment];
      temp.forEach(v=>{
        if(v.comment_id==action.data){
          v.content='삭제된 댓글입니다.'
          v.isWriter=false;
        }
      })
      return {
        ...state,
        comment:[...temp]
      }


    default:
      return state
  }
}

export default reducer