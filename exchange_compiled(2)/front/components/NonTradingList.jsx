import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NonTradingAction, OrderCancleAction } from '../reducers/wallet';
import styled from 'styled-components';

const NonTradingHistory = styled.div`
    width: 100%;
    height: 100%;

    & > div {
        height: 60px;
        padding: 10px 20px;
        text-align: right;
    }
    & > div > select {
        padding: 10px;
        padding-right: 40px;
        border: 1px solid lightgray;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    table > thead > tr > th {
        padding: 10px;
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
        background: #eee;
        border: 1px solid lightgray;
        border-left: none;
    }
    table > thead > tr > th:nth-last-child() {
        border-right: none;
    }

    table > tbody > tr > td {
        padding: 10px;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        border-bottom: 1px solid lightgray;
    }
    table > tbody > tr > td:nth-child(n+3):nth-child(-n+6) {
        text-align: right;
    }
    table > tbody > tr > td:nth-child(1) {
        font-size: 12px;
        font-weight: lighter;
    }

    table > tbody > tr > td > span {
        margin-left: 5px;
        color: #999;
        font-size: 12px;
    }

    table > tbody > tr > td > ul {
        padding: 5px 20px;
        text-decoration: line-through;
    }
    
    table > tbody > tr > td > button {
        padding: 5px 20px;
        color: #fff;
        background: crimson;
        border: none;
        cursor: pointer;
    }
    table > tbody > tr > td > button:hover {
        text-decoration: underline;
        filter: brightness(110%);
    }
`

const NonTradingList = () => {
    const dispatch = useDispatch();
    const { userid, useridx } = useSelector((state) => state.user);
    const { nontdList } = useSelector((state) => state.wallet);

    // 미체결 내역 불러오기
    useEffect(() => {
        const data = {
            userid: userid,
            useridx: useridx,
        }
    
        dispatch(NonTradingAction(data));
    }, []);

    // 주문취소
    const handleCancle = e => {
        const order_id = e.target.id;

        const data = {
            order_id: order_id,
        }
        const data2 = {
            userid: userid,
            useridx: useridx,
        }

        dispatch(OrderCancleAction(data));
        alert(`[주문번호 ${order_id}] 정상 취소 되었습니다.`);
        dispatch(NonTradingAction(data2));
    }

    return (
        <NonTradingHistory>
            <div>
                <select>
                    <option>전체 주문</option>
                    <option>일반 주문</option>
                    <option>예약 주문</option>
                </select>
            </div>
            <table>
                <colgroup>
                    <col width="10%" />
                    <col width="6%" />
                    <col width="18%" />
                    <col width="18%" />
                    <col width="18%" />
                    <col width="18%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>주문시간</th>
                        <th>거래종류</th>
                        <th>주문가격</th>
                        <th>주문수량</th>
                        <th>체결수량</th>
                        <th>미체결량</th>
                        <th>주문취소</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        nontdList.map((e, k) => {
                            return (
                                <tr>
                                    <td>
                                        {/* 주문시간 */}
                                        <p>
                                            {
                                                new Date(e.order_date).getFullYear()+"년 "
                                                +(new Date(e.order_date).getMonth()+1)+"월 "
                                                +new Date(e.order_date).getDate()+"일"
                                            }
                                        </p>
                                        <p>
                                            {
                                                new Date(e.order_date).getHours()+"시 "
                                                +new Date(e.order_date).getMinutes()+"분 "
                                                +new Date(e.order_date).getSeconds()+"초"
                                            }
                                        </p>
                                    </td>
                                    <td>
                                        {/* 거래종류 */}
                                        {
                                            e.order_type == 0
                                            ? <div style={{ color: "red" }}>매수</div>
                                            : <div style={{ color: "blue" }}>매도</div>
                                        }
                                    </td>
                                    <td>
                                        {/* 주문가격 */}
                                        {e.price.toLocaleString('en')}
                                        <span>KRW</span>
                                    </td>
                                    <td>
                                        {/* 주문수량 */}
                                        {e.qty.toLocaleString('en')}
                                        <span>AGU</span>
                                    </td>
                                    <td>
                                        {/* 체결수량 */}
                                        {(e.qty - e.leftover).toLocaleString('en')}
                                        <span>AGU</span>
                                    </td>
                                    <td>
                                        {/* 미체결량 */}
                                        {e.leftover.toLocaleString('en')}
                                        <span>AGU</span>
                                    </td>
                                    <td>
                                        {/* 주문취소 */}
                                        {
                                            e.del == 0
                                            ? <button
                                                id={e.id}
                                                type="submit"
                                                onClick={handleCancle}
                                            >
                                                주문취소
                                            </button>
                                            : <div>취소완료</div>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </NonTradingHistory>
    );
}

export default NonTradingList;