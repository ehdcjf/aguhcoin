const initialState = {
  loading:false,
  error:false,
  gender: 0,
  minage: 0,
  maxage: 120,
  hometown: 0,
  residence: 0,
  vote19: 0,
  voteData: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }
    ]
  }

}

const UPDATE_VOTE_REQUEST = 'UPDATE_VOTE_REQUEST'
const UPDATE_VOTE_SUCCESS = 'UPDATE_VOTE_SUCCESS'
const UPDATE_VOTE_ERROR = 'UPDATE_VOTE_ERROR'

export const UpdateVote = (data)=>{
  return (dispatch)=>{
    dispatch(UpdateVoteRequest());
    try{
      data.success == true
      ? dispatch(UpdateVoteSuccess(data))
      :dispatch(UpdateVoteError())
    }catch(e){
      dispatch(UpdateVoteError())
    }
  }
}

export const UpdateVoteRequest = () => {
  return {
    type: UPDATE_VOTE_REQUEST,
  }
}
export const UpdateVoteSuccess = (data) => {

  return {
    type: UPDATE_VOTE_SUCCESS,
    data: data,
  }
}
export const UpdateVoteError = () => {
  return {
    type: UPDATE_VOTE_ERROR,
  }
}





const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VOTE_REQUEST:
      return {
        ...state,
        loadding: true,

      }
    case UPDATE_VOTE_SUCCESS:
      return {
        ...state,
        voteData:{
          ...state.voteData,
          labels: [...action.data.label],
          datasets: [
            {
              ...state.voteData.datasets[0],
              data: [...action.data.data],
              backgroundColor: [...action.data.color],
              hoverBackgroundColor: [...action.data.color],
            },
          ],
        },
        error:false,
        loadding: false,
      }
    case UPDATE_VOTE_ERROR:
      return {
        ...state,
        loadding: false,
        error:true
      }

    default:
      return state
  }
}

export default reducer
