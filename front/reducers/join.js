const initialState = {
  userid: null,
  nickname: null,
  hometown: null,
  residence: null,
  gender: null,
  age: null,
  image: null,
}




const USER_JOIN_REQUEST = 'USER_JOIN_REQUEST'
const USER_JOIN_SUCCESS = 'USER_JOIN_SUCCESS'
const USER_JOIN_ERROR = 'USER_JOIN_ERROR'

export const UserJoinAction = (data) => {
  return async (dispatch) => {
    // dispatch(UserJoinRequest());

    // try {
    //   const response = await fetch('http://localhost:3000/api/login', {
    //     method: 'POST',
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ...data
    //     })
    //   })
    //   const result = await response.json()
    //   console.log(result)
    //   result.result === 'OK'
    //     ? dispatch(UserLoginSuccess(result))
    //     : dispatch(UserLoginError())
    // } catch (e) {
    //   dispatch(UserLoginError())
    // }
  }
}

export const UserJoinInit = (data) => {
  return {
    type: USER_JOIN_INIT,
    data: data,
  }
}

export const UserJoinRequest = (data) => {
  return {
    type: USER_JOIN_REQUEST,
    data: data,
  }
}

export const UserLoginSuccess = () => {
  return {
    type: USER_JOIN_SUCCESS,

  }
}
export const UserLoginError = () => {
  return {
    type: USER_JOIN_ERROR,

  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_JOIN_INIT:
      return {
        ...state,
        userid: action.data,

      }
    case USER_JOIN_REQUEST:
      return {
        ...state,
        nickname: action.data.nickname,
      }
    case USER_JOIN_ERROR:
      return {
        ...state,
        loadding: false,
      }

    default:
      return state
  }
}

export default reducer
