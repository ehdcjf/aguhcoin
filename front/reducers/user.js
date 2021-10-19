const initialState = {
    isError:false, 
    isLoading:false,
    isLogin: false,
    check: null,
    userid: null,
    useridx: null,
    myAsset: 0,
    lockedAsset: 0,
    availableAsset: 0,
    myCoin: 0,
    lockedCoin: 0,
    availableCoin: 0,
    coinValue:0,
    msg:"",
    joinSuccess:false,
}

const server = process.env.NEXT_PUBLIC_APP_SERVER_URI || "http://3.34.76.79:3500"; 


const DUPLICATECHECK_REQUEST = "DUPLICATECHECK_REQUEST";
const DUPLICATECHECK_SUCCESS = "DUPLICATECHECK_SUCCESS";
const DUPLICATECHECK_ERROR = "DUPLICATECHECK_ERROR";
const USER_JOIN_REQUEST = "USER_JOIN_REQUEST";
const USER_JOIN_SUCCESS = "USER_JOIN_SUCCESS";
const USER_JOIN_ERROR = "USER_JOIN_ERROR";
const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";
const GET_TOTAL_ASSET = "GET_TOTAL_ASSET"
const UPDATE_LOCKED_ASSET = 'UPDATE_LOCKED_ASSET';
const UPDATE_LOCKED_COIN = 'UPDATE_LOCKED_COIN';


// Join -> DuplicateCheck(), 회원가입 아이디 유효성 검사
export const DuplicateCheckAction = data => {
    return async (dispatch) => {
        dispatch(DuplicateCheck_REQUEST());

        try {
            let url = server+`/user/idcheck`;
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();
            if(result.success){
                dispatch(DuplicateCheck_SUCCESS(result));
            }else{
                dispatch(DuplicateCheck_ERROR(result));
                console.log(result.error)
                alert(result.error);
            }
        } catch (e) {
            const result = { 
                error:"서버 접속 오류"
            }
            dispatch(DuplicateCheck_ERROR(result));
            alert(result.error);
        }
    }
}

export const DuplicateCheck_REQUEST = () => {
    return {
        type: DUPLICATECHECK_REQUEST,
    }
}
export const DuplicateCheck_SUCCESS = data => {
    return {
        type: DUPLICATECHECK_SUCCESS,
        data: data,
    }
}
export const DuplicateCheck_ERROR = (data) => {
    return {
        type: DUPLICATECHECK_ERROR,
        data:data,
    }
}

// join, 회원가입
export const UserJoinAction = data => {
    return async (dispatch) => {
        dispatch(UserJoin_REQUEST());

        try {
            let url =  server+`/user/join`;
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();
            if(result.success){
                dispatch(UserJoin_SUCCESS(result));
            }else{
            dispatch(UserJoin_ERROR(result));
            console.log(result.error);
            alert(result.error);
            }
        } catch (e) {
            const result = {
                error:'회원가입에 실패'
            }
            dispatch(UserJoin_ERROR(result));
            alert(result.error);
        }
    }
}

export const UserJoin_REQUEST = () => {
    return {
        type: USER_JOIN_REQUEST,
    }
}
export const UserJoin_SUCCESS = data => {
    return {
        type: USER_JOIN_SUCCESS,
        data: data,
    }
}
export const UserJoin_ERROR = (data) => {
    return {
        type: USER_JOIN_ERROR,
        data:data,
    }
}

// Login, 로그인
export const UserLoginAction = data => {
    return async (dispatch) => {
        dispatch(UserLogin_REQUEST());

        try {
            let url = server+'/user/login';
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();
            if(result.success){
                dispatch(UserLogin_SUCCESS(result));
            }else{
                dispatch(UserLogin_ERROR(result));
                alert('존재하지 않는 회원 정보입니다.');
            }

            if (result.totalAsset.success) {
                dispatch(GetMyAsset(result.totalAsset));
            }
        } catch (e) {
            dispatch(UserLogin_ERROR());
        }
    }
}


export const GetMyAsset = (data) => {
    let totalAsset = data;
    delete totalAsset.sussess
    return {
        type: GET_TOTAL_ASSET,
        data: totalAsset,
    }
}

export const UpdateLockedAsset = (data)=>{
    console.log(data)
    return {
        type: UPDATE_LOCKED_ASSET,
        data:data,
    }
}

export const UpdateLockedCoin = (data)=>{
    console.log(data)
    return {
        type: UPDATE_LOCKED_COIN,
        data:data,
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
export const UserLogin_ERROR = (data) => {
    return {
        type: USER_LOGIN_ERROR,
        data:data,
    }
}

// Logout, 로그아웃
export const UserLogoutAction = data => {
    return async (dispatch) => {
        dispatch(UserLogout_REQUEST());

        try {
            let url = server+'/user/logout';
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();
            dispatch(UserLogout_SUCCESS(result));
        } catch (e) {
            dispatch(UserLogout_ERROR());
        }
    }
}

export const UserLogout_REQUEST = () => {
    return {
        type: USER_LOGOUT_REQUEST,
    }
}
export const UserLogout_SUCCESS = data => {
    return {
        type: USER_LOGOUT_SUCCESS,
        data: data,
    }
}
export const UserLogout_ERROR = () => {
    return {
        type: USER_LOGOUT_ERROR,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DUPLICATECHECK_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case DUPLICATECHECK_SUCCESS:
            return {
                ...state,
                isLoading:false, 
                check: true,
            }
        case DUPLICATECHECK_ERROR:
            return {
                ...state,
                isLoading:false, 
                check:false,
                msg:action.data.error,
            }
        case USER_JOIN_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case USER_JOIN_SUCCESS:
            return {
                ...state,
                isLoading:false, 
                joinSuccess:true,
            }
        case USER_JOIN_ERROR:
            return {
                ...state,
                isLoading:false, 
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading:false, 
                isLogin: true,
                success: action.data.success,
                userid: action.data.userid,
                useridx: action.data.user_idx,
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading:false, 
                isError:true,
            }
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
                uesrid: '',
                useridx: null,
            }
        case USER_LOGOUT_ERROR:
            return {
                ...state,
                ...initialState
            }
        case GET_TOTAL_ASSET:

            return {
                ...state,
                ...action.data,
            }
        case UPDATE_LOCKED_ASSET:
            let newLockedAsset = state.lockedAsset + action.data.asset_result;
            let newavailableAsset = state.myAsset - newLockedAsset; 
            return{
                ...state,
                lockedAsset:newLockedAsset,
                availableAsset:newavailableAsset,
            }
        case UPDATE_LOCKED_COIN:
            let newLockedCoin = state.lockedCoin + action.data.coin_result;
            let newavailableCoin = state.myCoin - newLockedCoin; 
            return{
                ...state,
                lockedCoin:newLockedCoin,
                availableCoin:newavailableCoin,
            }

        default:
            return state;
    }
}

export default reducer;