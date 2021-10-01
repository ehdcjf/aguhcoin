
const initialState = {
  type: 'all',
  search: null,
  keyword: null,
  page: 1,
  rows: 30,
  pageblock: [],
  endpage: null,
  list: [],
}



const SHOW_LIST_REQUEST = 'SHOW_LIST_REQUEST'
const SHOW_LIST_SUCCESS = 'SHOW_LIST_SUCCESS'
const SHOW_LIST_ERROR = 'SHOW_LIST_ERROR'
const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST'
const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS'
const DELETE_ARTICLE_ERROR = 'DELETE_ARTICLE_ERROR'
const CREATE_ARTICLE_ACTION = 'CREATE_ARTICLE_ACTION'

export const ShowListAction = (data) => {
  return async (dispatch) => {
    dispatch(ShowListRequest());
    try {
      const result = data;
      result.success === true
        ? dispatch(ShowListSuccess(result))
        : dispatch(ShowListError())
    } catch (e) {
      dispatch(ShowListError())
    }
  }
}

export const DeleteArticleAction = (data) => {
  return async (dispatch) => {
    dispatch(DeleteArticleRequest());
    try {
      data.success === true
        ? dispatch(DeleteArticleSuccess(data))
        : dispatch(DeleteArticleError())
    } catch (e) {
      dispatch(DeleteArticleError())
    }
  }
}





export const ShowListRequest = () => {
  return {
    type: SHOW_LIST_REQUEST,
  }
}
export const ShowListSuccess = (data) => {
  return {
    type: SHOW_LIST_SUCCESS,
    data: data,
  }
}
export const ShowListError = () => {
  return {
    type: SHOW_LIST_ERROR,
  }
}


export const DeleteArticleRequest = () => {
  return {
    type: DELETE_ARTICLE_REQUEST,
  }
}
export const DeleteArticleSuccess = (data) => {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    data: data,
  }
}
export const DeleteArticleError = () => {
  return {
    type: DELETE_ARTICLE_ERROR,
  }
}


export const CreateArticleAction = () => {
  return {
    type: CREATE_ARTICLE_ACTION,
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SHOW_LIST_REQUEST:
      return {
        ...state,
        loadding: true,

      }
    case SHOW_LIST_SUCCESS:
      return {
        ...state,
        list: [...action.data.results],
        page: action.data.page,
        rows: action.data.rows,
        pageblock: action.data.pageblock,
        endpage: action.data.totalPage,
        type:action.data.type,
        loadding: false,
      }
    case SHOW_LIST_ERROR:
      return {
        ...state,
        loadding: false,
      }

    case DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        loadding: true,
      }
    case DELETE_ARTICLE_SUCCESS:
      const target = action.data.id;
      const newList = [...state.list].map((v) => {
        if (v.id == target) {
          v.subject = "삭제된 게시글입니다."
          v.del = 1
          return v
        }
        return v;
      })
      return {
        ...state,
        list: [...newList],

        loadding: false,
      }
    case DELETE_ARTICLE_ERROR:
      return {
        ...state,
        loadding: false,
      }
    case CREATE_ARTICLE_ACTION:
      return {
        ...state,
        type: 'all',
        page: 1,
      }
    default:
      return state
  }
}

export default reducer
