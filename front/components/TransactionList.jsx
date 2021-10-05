import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionAction } from '../reducers/wallet';

const TransactionTable = styled.div`
    & > table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    & > table > thead > tr > th {
        padding: 10px;
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
        background: #eee;
        border: 1px solid lightgray;
        border-left: none;
    }
    & > table > thead > tr > th:nth-last-child() {
        border-right: none;
    }
    & > table > tbody > tr > td {
        padding: 10px;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        border-bottom: 1px solid lightgray;
    }
    & > table > tbody > tr > td:nth-child(n+3):nth-child(-n+7) {
        text-align: right;
    }
    & > table > tbody > tr > td:nth-child(1), td:nth-child(8) {
        font-size: 12px;
        font-weight: lighter;
    }
    & > table > tbody > tr > td > span {
        margin-left: 5px;
        color: #999;
        font-size: 12px;
    }
`

const TransactionList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(TransactionAction());
    }, []);

    return (
        <TransactionTable>
            <table>
                <colgroup>
                    <col width="10%" />
                    <col width="5%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>체결시간</th>
                        <th>거래종류</th>
                        <th>거래수량</th>
                        <th>거래단가</th>
                        <th>거래금액</th>
                        <th>수수료</th>
                        <th>정산금액(수수료반영)</th>
                        <th>주문시간</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 검색 결과 양에 따라 <tr> 갯수 결정 */}
                    <tr>
                        <td>
                            <p>2021.10.04</p>
                            <p>13:00</p>
                        </td>
                        <td>
                            {
                                // 매수 빨간색, 매도 파란색
                            }
                            <div style={{ color: "red" }}>매수</div>
                        </td>
                        <td>
                            999,999,999
                            <span>AGU</span>
                        </td>
                        <td>
                            99,999
                            <span>KRW</span>
                        </td>
                        <td>
                            99,999
                            <span>KRW</span>
                        </td>
                        <td>
                            99.99
                            <span>KRW</span>
                        </td>
                        <td>
                            100,098.99
                            <span>KRW</span>
                        </td>
                        <td>
                            <p>2021.10.04</p>
                            <p>12:50</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>2021.10.04</p>
                            <p>13:00</p>
                        </td>
                        <td>
                            {
                                // 매수 빨간색, 매도 파란색
                            }
                            <div style={{ color: "blue" }}>매도</div>
                        </td>
                        <td>
                            999,999,999
                            <span>AGU</span>
                        </td>
                        <td>
                            99,999
                            <span>KRW</span>
                        </td>
                        <td>
                            99,999
                            <span>KRW</span>
                        </td>
                        <td>
                            99.99
                            <span>KRW</span>
                        </td>
                        <td>
                            100,098.99
                            <span>KRW</span>
                        </td>
                        <td>
                            <p>2021.10.04</p>
                            <p>12:50</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </TransactionTable>
    );
}

export default TransactionList;