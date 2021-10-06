import axios from 'axios';

const initialState = {
    success: false,
    txList: [],
}

const TRANSACTION_REQUEST = "TRANSACTION_REQUEST";
const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
const TRANSACTION_ERROR = "TRANSACTION_ERROR";
const NONTRADING_REQUEST = "NONTRADING_REQUEST";
const NONTRADING_SUCCESS = "NONTRADING_SUCCESS";
const NONTRADING_ERROR = "NONTRADING_ERROR";

// Transaction, 거래내역
// export const TransactionAction = data => {
//     return async (dispatch) => {
//         dispatch(Transaction_REQUEST());

//         try {
//             let url = 'http://localhost:3500/user/txlog';
//             const response = await axios({
//                 method: "POST",
//                 url: url,
//                 data: { ...data },
//             });
//             console.log(response.data);
//             const result = response.data;

//             dispatch(Transaction_SUCCESS(result));
//         } catch (e) {
//             dispatch(Transaction_ERROR());
//         }
//     }
// }

// export const Transaction_REQUEST = () => {
//     return {
//         type: TRANSACTION_REQUEST,
//     }
// }
// export const Transaction_SUCCESS = data => {
//     return {
//         type: TRANSACTION_SUCCESS,
//         data: data,
//     }
// }
// export const Transaction_ERROR = () => {
//     return {
//         type: TRANSACTION_ERROR,
//     }
// }

// NonTrading. 미체결
export const NonTradingAction = data => {
    return async (dispatch) => {
        dispatch(NonTrading_REQUEST());

        try {
            let url = 'http://localhost:3500/user/txlog';
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_REQUEST:
            return {
                ...state,
            }
        case TRANSACTION_SUCCESS:
            return {
                ...state,
                success: true,
                // txList: action.data.txList,
            }
        case TRANSACTION_ERROR:
            return {
                ...state,
            }
        case NONTRADING_REQUEST:
            return {
                ...state,
            }
        case NONTRADING_SUCCESS:
            return {
                ...state,
                success: true,
                txList: action.data.txList,
            }
        case NONTRADING_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;