import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import Router from 'next/router';
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
        /* margin-top: 40px; */
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

const NonTrading = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <WalletLayout>
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
                            <col width="5%" />
                            <col width="18.75%" />
                            <col width="18.75%" />
                            <col width="18.75%" />
                            <col width="18.75%" />
                            <col width="10%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>시간</th>
                                <th>거래종류</th>
                                <th>주문가격</th>
                                <th>주문수량</th>
                                <th>체결수량</th>
                                <th>미체결량</th>
                                <th>주문취소</th>
                            </tr>
                        </thead>
                        <tbody>
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
                                    999
                                    <span>KRW</span>
                                </td>
                                <td>
                                    20.00000000
                                    <span>AGU</span>
                                </td>
                                <td>
                                    0.00000000
                                    <span>AGU</span>
                                </td>
                                <td>
                                    20.00000000
                                    <span>AGU</span>
                                </td>
                                <td>
                                    <button type="submit">주문취소</button>
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
                                    999
                                    <span>KRW</span>
                                </td>
                                <td>
                                    20.00000000
                                    <span>AGU</span>
                                </td>
                                <td>
                                    0.00000000
                                    <span>AGU</span>
                                </td>
                                <td>
                                    20.00000000
                                    <span>AGU</span>
                                </td>
                                <td>
                                    <button type="submit">주문취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </NonTradingHistory>
            </WalletLayout>
        </>
    );
}

export default NonTrading;