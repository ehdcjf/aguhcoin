const initialState = {
    buyList:[],
    sellList:[],
    txList:[],
    series : [{
        name: 'candle',
        data: []
    }],
    tradingBuy:null,
}

// 1. success인지 확인 -> 서버에서 이미 한번 거르므로 필요없음

const GET_EXCHANGE = "GET_EXCHANGE"
const GET_BUYLIST = "GET_BUYLIST"
const GET_SELLLIST = "GET_SELLLIST"
const GET_TXLIST = "GET_TXLIST"
const GET_CHARTDATA = "GET_CHARTDATA"
const GET_ASSET = "GET_ASSET"
// const TRADING_REQUEST = "TRADING_REQUEST"
// const TRADING_SUCCESS = "TRADING_SUCCESS"
// const TRADING_ERROR = "TRADING_ERROR"


// 호가창
export const GetExchange = (data) => {
    const exchange = data
    // console.log(exchange)
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
    if(exchange.chartdata.length>0){
        dispatch(GetChartData(exchange.chartdata)) 
    }
//     if(exchange.)
// }
}}

export const TradingBuy = data => {
    return async (dispatch) => {
        dispatch(TRADING_REQUEST());
        try {
            let url = `http://localhost:3500/exchange/trading`;
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...data }),
            });
            const result = await response.json();
            console.log('매수매도?', result);
            if (result.success){
                dispatch(TRADING_SUCCESS(result));
            }else{
                dispatch(TRADING_ERROR());
            }
        } catch (e) {
            dispatch(TRADING_ERROR());
        }
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
export const GetChartData = (data) => {
    return {
        type: GET_CHARTDATA,
        data: data,
    }
}
// export const GetMyAsset = (data)=>{
//     return {
//         type: GET_ASSET,
//         data:data,
//     }
// }






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
      
        case GET_CHARTDATA:
            console.log('xxxxxxxxxxxxxxx')
            console.log(action.data)
            return {
                ...state,
                series: [{
                    name: 'candle',
                    data: [...action.data]
                }]
            }
            case TRADING_BUY_REQUEST:
                return {
                    ...state,
                    success: null,
                    userid: null,
                    useridx: null,
                }
            case TRADING_BUY_SUCCESS:
                return {
                    ...state,
                    tradingBuy: action.data.tradingBuy,
                    success: action.data.success,
                    trBuyPrice: action.data.trBuyPrice,
                    trBuyQty: action.data.trBuyQty,
                }
            case TRADING_BUY_ERROR:
                return {
                    ...state,
                }

        default:
            return state;
    }
}

export default reducer;