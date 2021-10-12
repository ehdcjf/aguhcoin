const initialState = {
    loadding: true,
    isError: false,
    buyList: [],
    sellList: [],
    txList: [],
    series: [{
        name: 'candle',
        data: []
    }]
}

// 1. success인지 확인 -> 서버에서 이미 한번 거르므로 필요없음

const server = process.env.REACT_APP_SERVER_URI || "http://3.34.76.79:3500"; 

const GET_BUYLIST = "GET_BUYLIST"
const GET_SELLLIST = "GET_SELLLIST"
const GET_TXLIST = "GET_TXLIST"
const GET_CHARTDATA = "GET_CHARTDATA"
const UPDATE_TXLIST = "UPDATE_TXLIST"
const UPDATE_CHARTDATA = "UPDATE_CHARTDATA"
const GET_EXCHANGE_REQUEST = 'GET_EXCHANGE_REQUEST'
const LOAD_SUCCESS = 'LOAD_SUCCESS'
const GET_EXCHANGE_ERROR = 'GET_EXCHANGE_ERROR'


export const GetExchangeAction = () => {
    return async (dispatch) => {
        dispatch(GetExchange_REQUEST());
        try {
            let url = server+`/exchange/all`;
            const response = await fetch(url, {
                method: "get",
                mode: "cors",
                credentials: "include",
            });
            const result = await response.json();
            if (result.success) {
                dispatch(GetExchange_SUCCESS(result));
            }
        } catch (e) {
            dispatch(GetExchange_ERROR());
        }
    }

}







export const GetExchange_SUCCESS = (data) => {

    const exchange = data
    return (dispatch) => {
        if (exchange.buyList.success) {
            dispatch(GetBuyList(exchange.buyList.list))
        }
        if (exchange.sellList.success) {
            dispatch(GetSellList(exchange.sellList.list))
        }
        if (exchange.txList.success) {
            dispatch(GetTxList(exchange.txList.list))
        }
        if (exchange.chartdata.length > 0) {
            dispatch(GetChartData(exchange.chartdata))
        }

        dispatch(LoadSuccess())
    }
}


export function UpdateExchange(data) {
    const exchange = data
    console.log(data)
    return (dispatch) => {
        if (exchange.buyList.success) {
            dispatch(GetBuyList(exchange.buyList.list))
        }
        if (exchange.sellList.success) {
            dispatch(GetSellList(exchange.sellList.list))
        }
        if (exchange.txList.success) {
            dispatch(UpdateTxList(exchange.txList.list))
            dispatch(UpdateChartData(exchange.txList.list))
        }
    }
}




export const GetExchange_REQUEST = () => {
    return {
        type: GET_EXCHANGE_REQUEST,
    }
}

export const LoadSuccess = () => {
    return {
        type: LOAD_SUCCESS,
    }
}
export const GetExchange_ERROR = () => {
    return {
        type: GET_EXCHANGE_ERROR,
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

export const UpdateTxList = (data) => {
    return {
        type: UPDATE_TXLIST,
        data: data,
    }
}
export const UpdateChartData = (data) => {
    return {
        type: GET_CHARTDATA,
        data: data,
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXCHANGE_REQUEST:
            return {
                ...state,
                loadding: true
            }
        case LOAD_SUCCESS:
            return {
                ...state,
                loadding: false,
            }
        case GET_EXCHANGE_ERROR:
            return {
                ...state,
                loadding: false,
                isError: true,
            }

        case GET_BUYLIST:
            return {
                ...state,
                buyList: [...action.data],
            }
        case GET_SELLLIST:
            return {
                ...state,
                sellList: [...action.data],
            }
        case GET_TXLIST:
            return {
                ...state,
                txList: [...action.data]
            }

        case GET_CHARTDATA:
            return {
                ...state,
                series: [{
                    name: 'candle',
                    data: [...action.data]
                }]
            }
        case UPDATE_TXLIST:
            return {
                ...state,
                txList: [action.data, ...state.txList]
            }

        case UPDATE_CHARTDATA:
            const data = action.data.list;
            let newChartdata = [...state.series[0].data]
            let cnt = 0;
            while (cnt < data.length) {
                const v = data[cnt];
                let lastItem = newChartdata[newChartdata.length - 1];
                let lastTime = lastItem.x;
                const lastDate = new Date(lastTime);
                const nowDate = new Date(v.tx_date);
                if (lastDate.getFullYear() == nowDate.getFullYear()
                    && lastDate.getMonth() == nowDate.getMonth()
                    && lastDate.getDate() == nowDate.getDate()
                    && lastDate.getHours() == nowDate.getHours()
                    && lastDate.getMinutes() == nowDate.getMinutes()
                ) {
                    newChartdata[newChartdata.length - 1].y[3] = v.price; //종가 update 
                    if (lastItem.y[1] == null || lastItem.y[1] < v.price) {
                        newChartdata[newChartdata.length - 1].y[1] = v.price
                    }
                    if (lastItem.y[2] == null || lastItem.y[2] > v.price) {
                        newChartdata[newChartdata.length - 1].y[2] = v.price
                    }
                    cnt++;
                } else {
                    const newDate = new Date(lastTime).setMinutes(lastTime.getMinutes() + 1);
                    const open = lastItem.y[3] != null ? lastItem.y[3] : lastItem.y[0];
                    newChartdata.push({ x: new Date(newDate), y: [open, null, null, null] })
                }
            }
            return {
                ...state,
                chartdata: [...newChartdata]
            }

        default:
            return state;
    }
}

export default reducer;