import axios from 'axios';

const initialState = {
    success: false,
    mcAsset: null,
    txList: [],
    nontdList: [],
}

const server = process.env.REACT_APP_SERVER_URI || "http://3.34.76.79:3500"; 

const TRANSACTION_REQUEST = "TRANSACTION_REQUEST";
const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
const TRANSACTION_ERROR = "TRANSACTION_ERROR";
const NONTRADING_REQUEST = "NONTRADING_REQUEST";
const NONTRADING_SUCCESS = "NONTRADING_SUCCESS";
const NONTRADING_ERROR = "NONTRADING_ERROR";
const ORDERCANCLE_REQUEST = "ORDERCANCLE_REQUEST";
const ORDERCANCLE_SUCCESS = "ORDERCANCLE_SUCCESS";
const ORDERCANCLE_ERROR = "ORDERCANCLE_ERROR";

const TRANSACTION_CTG_REQUEST = "TRANSACTION_CTG_REQUEST";
const TRANSACTION_CTG_SUCCESS = "TRANSACTION_CTG_SUCCESS";
const TRANSACTION_CTG_ERROR = "TRANSACTION_CTG_ERROR";

// Transaction, 거래내역
export const TransactionAction = data => {
    return async (dispatch) => {
        dispatch(Transaction_REQUEST());

        try {
            let url =server+'/user/txlog';
            const response = await axios({
                method: "POST",
                url: url,
                data: { ...data },
            });
            const result = response.data;

            
            dispatch(Transaction_SUCCESS(result));
        } catch (e) {
            dispatch(Transaction_ERROR());
        }
    }
}

export const Transaction_REQUEST = () => {
    return {
        type: TRANSACTION_REQUEST,
    }
}
export const Transaction_SUCCESS = data => {
    return {
        type: TRANSACTION_SUCCESS,
        data: data,
    }
}
export const Transaction_ERROR = () => {
    return {
        type: TRANSACTION_ERROR,
    }
}

// TransactionCtgAction, 거래내역 카테고리 버튼
export const TransactionCtgAction = data => {
    return async (dispatch) => {
        dispatch(TransactionCtg_REQUEST());

        try {
            let url = server+'/user/txlog';
            const response = await axios({
                method: "POST",
                url: url,
                data: { ...data },
            });
            console.log('리듀서 카테고리별 거래내역', response.data);
            const result = response.data;

            dispatch(TransactionCtg_SUCCESS(result));
        } catch (e) {
            dispatch(TransactionCtg_ERROR());
        }
    }
}

export const TransactionCtg_REQUEST = () => {
    return {
        type: TRANSACTION_CTG_REQUEST,
    }
}
export const TransactionCtg_SUCCESS = data => {
    return {
        type: TRANSACTION_CTG_SUCCESS,
        data: data,
    }
}
export const TransactionCtg_ERROR = () => {
    return {
        type: TRANSACTION_CTG_ERROR,
    }
}

// NonTrading, 미체결
export const NonTradingAction = data => {
    return async (dispatch) => {
        dispatch(NonTrading_REQUEST());

        try {
            let url = server+'/user/nontd';
            const response = await axios({
                method: "POST",
                url: url,
                data: { ...data },
            });
            const result = response.data;

            dispatch(NonTrading_SUCCESS(result));
        } catch (e) {
            dispatch(NonTrading_ERROR());
        }
    }
}

export const NonTrading_REQUEST = () => {
    return {
        type: NONTRADING_REQUEST,
    }
}
export const NonTrading_SUCCESS = data => {
    return {
        type: NONTRADING_SUCCESS,
        data: data,
    }
}
export const NonTrading_ERROR = () => {
    return {
        type: NONTRADING_ERROR,
    }
}

// NonTrading -> handleOrderCancle(), 주문취소
export const OrderCancleAction = data => {
    return async (dispatch) => {
        dispatch(OrderCancle_REQUEST());

        try {
            let url = server+'/exchange/cancle';
            const response = await axios({
                method: "POST",
                url: url,
                data: { ...data },
            });
            const result = response.data;

            

            dispatch(OrderCancle_SUCCESS(result));
        } catch (e) {
            dispatch(OrderCancle_ERROR());
        }
    }
}

export const OrderCancle_REQUEST = () => {
    return {
        type: ORDERCANCLE_REQUEST,
    }
}
export const OrderCancle_SUCCESS = data => {
    return {
        type: ORDERCANCLE_SUCCESS,
        data: data,
    }
}
export const OrderCancle_ERROR = () => {
    return {
        type: ORDERCANCLE_ERROR,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_REQUEST:
            return {
                ...state,
                txList: [],
            }
        case TRANSACTION_SUCCESS:
            return {
                ...state,
                success: action.data.success,
                txList: action.data.txList,
            }
        case TRANSACTION_ERROR:
            return {
                ...state,
            }
        case TRANSACTION_CTG_REQUEST:
            return {
                ...state,
                txList: [],
            }
        case TRANSACTION_CTG_SUCCESS:
            return {
                ...state,
                success: action.data.success,
                txList: action.data.txList,
            }
        case TRANSACTION_CTG_ERROR:
            return {
                ...state,
            }
        case NONTRADING_REQUEST:
            return {
                ...state,
                nontdList: [],
            }
        case NONTRADING_SUCCESS:
            return {
                ...state,
                success: action.data.success,
                nontdList: action.data.nontdList,
            }
        case NONTRADING_ERROR:
            return {
                ...state,
            }
        case ORDERCANCLE_REQUEST:
            return {
                ...state,
                nontdList: [],
            }
        case ORDERCANCLE_SUCCESS:
            return {
                ...state,
                success: action.data.success,
            }
        case ORDERCANCLE_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;