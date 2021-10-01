import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from './user'
import category from './category'
import board from './board'
import article from './article'
import comment from './comment'
import vote from './vote'

import { persistReuder } from 'redux-persist'
import storage from "redux-persist/lib/storage"

const reducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload
        }
      default:
        return state
    }
  },
  user, board, category, article, comment, vote,
})

export default reducer