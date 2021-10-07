import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import wallet from './wallet';
import test from './test';
import exchange from './exchange'

const reducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return {
                    ...state,
                    ...action.payload
                }
            default:
                return state;
        }
    },
    user, wallet, test, exchange
})

export default reducer;