const initialState = {
  loadding: false,
  IsLogin: false,
  nickname: null,
  image: '/defaultProfil.png',
  user_id:null,
}


const USER_UPDATE_ACTION = 'USER_UPDATE_ACTION'
const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'
const USER_LOGOUT = 'USER_LOGOUT'

export const UserLoginAction = (data) => {
  return async (dispatch) => {
    dispatch(UserLoginRequest());
    try {

      data.success === true
        ? dispatch(UserLoginSuccess(data))
        : dispatch(UserLoginError())
    } catch (e) {
      dispatch(UserLoginError())
    }
  }
}

export const UserUpdateAction = (data) => {
  return {
    type:USER_UPDATE_ACTION,
    data:data,
  }
}


export const UserLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,

  }
}
export const UserLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    data: data,

  }
}
export const UserLoginError = () => {
  return {
    type: USER_LOGIN_ERROR,

  }
}


export const UserLogoutAction = () => {
  return {
    type: USER_LOGOUT,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loadding: true,

      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        IsLogin: true,
        nickname: action.data.nickname,
        image: action.data.image,
        user_id:action.data.user_id,
        loadding: false,
      }
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loadding: false,
      }
    case USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      }
    case USER_UPDATE_ACTION:
      return {
        ...state,
        nickname:action.data.nickname,
        image: action.data.image,
      }
    default:
      return state
  }
}

export default reducer
