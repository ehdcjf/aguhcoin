import axios from "axios";
const initialState = {
    loading:false,
    isLogin:false,
}

const USER_JOIN_REQUEST = "USER_JOIN_REQUEST";
const USER_JOIN_SUCCESS = "USER_JOIN_SUCCESS";
const USER_JOIN_ERROR = "USER_JOIN_ERROR";
const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
const USER_LOGOUT = "USER_LOGOUT";

// Join
export const UserJoinAction = data => {
    return async (dispatch) => {
        dispatch(UserJoin_REQUEST());

        try {

            let url = 'http://localhost:3500/user/join';
            let options = {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                ...data,
              }),
            //   withCredentials: true,
            };
            const response = await axios(
                {   
                    method: 'post',
                    url: url,
                    data:{...data}
                  });
            console.log(response.data);
            const result =response.data;
            
            dispatch(UserJoin_SUCCESS(result));
        } catch (e) {
            dispatch(UserJoin_ERROR());
        }
    }
}

// Login
export const UserLoginAction = data => {
    return async (dispatch) => {
        dispatch(UserLogin_REQUEST());

        try {
            let url = 'http://localhost:3500/user/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();

            dispatch(UserLogin_SUCCESS(result));
        } catch (e) {
            dispatch(UserLogin_ERROR());
        }
    }
}

// Join
export const UserJoin_REQUEST = data => {
    return {
        type:USER_JOIN_REQUEST,
    }
}
export const UserJoin_SUCCESS = () => {
    return {
        type:USER_JOIN_SUCCESS,
    }
}
export const UserJoin_ERROR = () => {
    return {
        type:USER_JOIN_ERROR,
    }
}

// Login
export const UserLogin_REQUEST = data => {
    return {
        type:USER_LOGIN_REQUEST,
    }
}
export const UserLogin_SUCCESS = () => {
    return {
        type:USER_LOGIN_SUCCESS,
    }
}
export const UserLogin_ERROR = () => {
    return {
        type:USER_LOGIN_ERROR,
    }
}
export const UserLogoutAction = () => {
    return {
        type:USER_LOGOUT
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_JOIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_JOIN_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case USER_JOIN_ERROR:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loading: false,
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
            }
        case USER_LOGOUT:
            return {
                ...state,
                isLogin: false,
            }
        default:
            return state;
    }
}

export default reducer;