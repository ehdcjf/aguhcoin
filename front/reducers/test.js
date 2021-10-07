const initialState = {
  socketUrl:"ws://localhost:6005",
  chartData:[],
  buyList:[],
  sellList:[],
  txList:[],
}


const CHARTDATA_SUCCESS = 'CHARTDATA_SUCCESS';
const EXCHANGE_ACTION = 'EXCHANGE_ACTION';
const GET_BUYLIST_SUCCESSS='GET_BUYLIST_SUCCESSS'




export const Exchange_Action = (data) => {
  return {
      type:EXCHANGE_ACTION,
      data:data,
  }
}

export const ChartData_SUCCESS = (data) => {
  return {
      type:CHARTDATA_SUCCESS,
      data:data,
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

      case CHARTDATA_SUCCESS:
          return {
              ...state,
              chartdata: action.data,
          }

      default:
          return state;
  }
}

export default reducer;