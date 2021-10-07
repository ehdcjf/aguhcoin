const initialState = {
    buyList:[],
    sellList:[],
    txList:[],
    chartData:[]
}

// 1. success인지 확인 -> 서버에서 이미 한번 거르므로 필요없음

const GET_EXCHANGE = "GET_EXCHANGE"
const GET_BUYLIST = "GET_BUYLIST"
const GET_SELLLIST = "GET_SELLLIST"
const GET_TXLIST = "GET_TXLIST"
const GET_CHARTDATA = "GET_CHARTDATA"




export const GetExchange = (data) => {
    const exchange = data
    return (dispatch) => {
    if(exchange.buyList.success){
        dispatch(GetBuyList(exchange.buyList.list))
    }
    
    if(exchange.sellList.success){
        dispatch(GetSellList(exchange.sellList.list))
    }
    
    if(exchange.txList.success){
        dispatch(GetTxList(exchange.txList.list))
    }
    // if(exchange.chartdata.success){
    //     dispatch(GetChartData(exchange.chartData.list))
    // }
}
}

export const GetBuyList = data => {
    return {
        type: GET_BUYLIST,
        data: data,
    }
}
export const GetSellList = (data) => {
    return {
        type: GET_SELLLIST,
        data: data,
    }
}
export const GetTxList = (data) => {
    return {
        type: GET_TXLIST,
        data: data,
    }
}

const reducer = (state = initialState,action)=> {
    switch(action.type) {
        case GET_BUYLIST:
            return{
                ...state,
                buyList:[...action.data],
            }
        case GET_SELLLIST:
            return{
                ...state,
                sellList:[...action.data],
            }
        case GET_TXLIST:
            return {
                ...state,
                txList:[...action.data]
            }   
      
        default:
            return state;
    }
}

export default reducer;