const initialState = {
  socketUrl: "ws://localhost:6005",// 이거 env로. 


}


const CHARTDATA_SUCCESS = 'CHARTDATA_SUCCESS';
const BUY_ORDER_SUCCESS = 'BUY_ORDER_SUCCESS';
const SELL_ORDER_SUCCESS = 'SELL_ORDER_SUCCESS';

export const ChartData_SUCCESS = (data) => {
  return {
    type: CHARTDATA_SUCCESS,
    data: data,
  }
}


export const ChartData_SUCCESS = (data) => {
  return {
    type: CHARTDATA_SUCCESS,
    data: data,
  }
}




export const ChartData_SUCCESS = (data) => {
  return {
    type: CHARTDATA_SUCCESS,
    data: data,
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