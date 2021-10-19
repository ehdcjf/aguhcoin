const initialState = {
    loadding: true,
    isError: false,
    nowPrice: 0,
    buyList: [],
    sellList: [],
    txList: [],
    series: [{
        name: 'candle',
        data: [{ x: new Date(), y: [0, 0, 0, 0] }]
    }]
}


const server = process.env.NEXT_PUBLIC_APP_SERVER_URI || "http://3.34.76.79:3500";

const GET_BUYLIST = "GET_BUYLIST"
const GET_SELLLIST = "GET_SELLLIST"
const GET_TXLIST = "GET_TXLIST"
const GET_CHARTDATA = "GET_CHARTDATA"
const UPDATE_TXLIST = "UPDATE_TXLIST"
const UPDATE_CHARTDATA = "UPDATE_CHARTDATA"
const GET_EXCHANGE_REQUEST = 'GET_EXCHANGE_REQUEST'
const LOAD_SUCCESS = 'LOAD_SUCCESS'
const GET_EXCHANGE_ERROR = 'GET_EXCHANGE_ERROR'
const GET_NOW_PRICE = 'GET_NOW_PRICE'
const UPDATE_NOW_PRICE = 'UPDATE_NOW_PRICE'


export const GetExchangeAction = () => {
    return async (dispatch) => {
        dispatch(GetExchange_REQUEST());
        try {
            let url = server + `/exchange/all`;
            const response = await fetch(url, {
                method: "get",
                mode: "cors",
                credentials: "include",
            });
            const result = await response.json();
            console.log(result)
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
        if (exchange.buyList != undefined && exchange.buyList.success) {
            dispatch(GetBuyList(exchange.buyList.list))
        }
        if (exchange.sellList != undefined && exchange.sellList.success) {
            dispatch(GetSellList(exchange.sellList.list))
        }
        if (exchange.txList != undefined && exchange.txList.success) {
            dispatch(GetTxList(exchange.txList.list))
            dispatch(GetNowPrice(exchange.txList.list[exchange.txList.list.length - 1].price))
        }
        if (exchange.chartdata != undefined && exchange.chartdata.length > 0) {
            dispatch(GetChartData(exchange.chartdata))
        }

        dispatch(LoadSuccess())
    }
}


export function UpdateExchange(data) {
    const exchange = data
    return (dispatch) => {
        if (exchange.buyList != undefined && exchange.buyList.success) {
            dispatch(GetBuyList(exchange.buyList.list))
        }
        if (exchange.sellList != undefined && exchange.sellList.success) {
            dispatch(GetSellList(exchange.sellList.list))
        }
        if (exchange.txList != undefined && exchange.txList.success) {
            dispatch(UpdateTxList(exchange.txList.list))
            dispatch(UpdateNowPrice(exchange.txList.list[exchange.txList.list.length - 1].price))
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

export const GetNowPrice = (data) => {
    return {
        type: GET_NOW_PRICE,
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

export const UpdateNowPrice = (data) => {
    return {
        type: UPDATE_NOW_PRICE,
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
        case GET_NOW_PRICE:
            return {
                ...state,
                nowPrice: action.data,
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

        case UPDATE_NOW_PRICE:
            return {
                ...state,
                nowPrice: action.data
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