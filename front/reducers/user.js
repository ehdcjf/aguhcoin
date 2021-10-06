const initialState = {
    isLogin: false,
    userid: '',
    useridx: '',
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

            let url = `http://localhost:3500/user/join`;
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();

            dispatch(UserJoin_SUCCESS());
        } catch (e) {
            dispatch(UserJoin_ERROR());
        }
    }
}

export const UserJoin_REQUEST = () => {
    return {
        type: USER_JOIN_REQUEST,
    }
}
export const UserJoin_SUCCESS = () => {
    return {
        type: USER_JOIN_SUCCESS,
    }
}
export const UserJoin_ERROR = () => {
    return {
        type: USER_JOIN_ERROR,
    }
}

// Login
export const UserLoginAction = data => {
    return async (dispatch) => {
        dispatch(UserLogin_REQUEST());

        try {
            let url = 'http://localhost:3500/user/login';
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();

            dispatch(UserLogin_SUCCESS(result));
        } catch (e) {
            dispatch(UserLogin_ERROR());
        }
    }
}

export const UserLogin_REQUEST = () => {
    return {
        type: USER_LOGIN_REQUEST,
    }
}
export const UserLogin_SUCCESS = data => {
    return {
        type: USER_LOGIN_SUCCESS,
        data: data,
    }
}
export const UserLogin_ERROR = () => {
    return {
        type: USER_LOGIN_ERROR,
    }
}
export const UserLogoutAction = data => {
    return {
        type: USER_LOGOUT,
        data: data,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_JOIN_REQUEST:
            return {
                ...state,
            }
        case USER_JOIN_SUCCESS:
            return {
                ...state,
            }
        case USER_JOIN_ERROR:
            return {
                ...state,
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                userid: action.data.userid,
                useridx: action.data.useridx,
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
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