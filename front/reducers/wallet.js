import axios from 'axios';

const initialState = {
    exist: false,
}

const TRANSACTION_REQUEST = "TRANSACTION_REQUEST";
const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
const TRANSACTION_ERROR = "TRANSACTION_ERROR";

export const TransactionAction = () => {
    return async (dispatch) => {
        dispatch(Transaction_REQUEST());

        try {
            console.log('11');
            let url = 'http://localhost:3500/user/txlog';
            let options = {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                }),
            };
            console.log('22');
            const response = await axios({
                method: 'get',
                url: url,
                data: { ...data },
            });
            console.log('33');
            console.log(response.data);
            const result = response.data;
            console.log('44');

            dispatch(Transaction_SUCCESS(result));
        } catch (e) {
            dispatch(Transaction_ERROR());
        }
    }
}

// Transaction
export const Transaction_REQUEST = () => {
    return {
        type: TRANSACTION_REQUEST,
    }
}
export const Transaction_SUCCESS = () => {
    return {
        type: TRANSACTION_SUCCESS,
    }
}
export const Transaction_ERROR = () => {
    return {
        type: TRANSACTION_ERROR,
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
                exist: true,
            }
        case TRANSACTION_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;