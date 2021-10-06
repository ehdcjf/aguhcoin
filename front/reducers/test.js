const initialState = {
  socketUrl:"ws://localhost:6005",
  chartdata:  [
  ["Mon", 20, 28, 38, 45],
  ["Tue", 31, 38, 55, 66],
  ["Wed", 50, 55, 77, 80],
  ["Thu", 77, 77, 66, 50],
  ["Fri", 68, 66, 22, 15]
],

 header:[
  {
    type: "string",
    id: "Date"
  },
  
  {
    type: "number",
    label: "low"
  },
  {
    type: "number",
    label: "open"
  },
  {
    type: "number",
    label: "close"
  },
  {
    type: "number",
    label: "high"
  }
]
  
}


const CHARTDATA_SUCCESS = 'CHARTDATA_SUCCESS';

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