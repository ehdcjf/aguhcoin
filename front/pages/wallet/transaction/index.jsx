
import MainLayout from '../../../components/layout/MainLayout';
import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import styled from 'styled-components';

const TransactionHistory = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid #eee;

    & > div {
        display: flex;
    }
    & > div:nth-child(1) {
        flex-direction: row;
        width: 100%;
        height: 20%;
        align-items: center;
    }
    & > div:nth-child(2) {
        flex-direction: column;
        height: 100%;
    }

    & > div:nth-child(1) > div {
        display: flex;
        flex-direction: column;
        width: 33.33%;
        padding: 20px;
    }
    & > div:nth-child(1) > div > div {
        padding-bottom: 10px;
    }
    & > div:nth-child(1) > div > div > span {
        margin-left: 10px;
        color: gray;
        font-size: 12px;
        font-weight: lighter;
    }
    & > div:nth-child(1) > div > div > button {
        padding: 10px 20px;
        background: #fff;
        border: 1px solid lightgray;
        border-radius: 1px;
        cursor: pointer;
    }
    & > div:nth-child(1) > div > div > button:hover {
        color: steelblue;
        font-weight: bold;
        border: 1px solid steelblue;
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
    table > tbody > tr > td:nth-child(n+3):nth-child(-n+7) {
        text-align: right;
    }
    table > tbody > tr > td:nth-child(1), td:nth-child(8) {
        font-size: 12px;
        font-weight: lighter;
    }
    table > tbody > tr > td > span {
        margin-left: 5px;
        color: #999;
        font-size: 12px;
    }
`

const Transaction = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <MainLayout>
                <WalletLayout>
                    <TransactionHistory>
                        <div>
                            <div>
                                <div>
                                    기간
                                    <span>2021-08-31 ~ 2021.09.30</span>
                                </div>
                                <div>
                                    <button>1주일</button>
                                    <button>1개월</button>
                                    <button>3개월</button>
                                    <button>6개월</button>
                                    <button>직접입력</button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    거래종류
                                </div>
                                <div>
                                    <button>전체</button>
                                    <button>매수</button>
                                    <button>매도</button>
                                    <button>입금</button>
                                    <button>출금</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                // boolean false일 경우 '검색 결과 없음' 출력
                                // <NoResult>검색 결과 없음</NoResult>
                            }
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
                        </div>
                    </TransactionHistory>
                </WalletLayout>
            </MainLayout>
        </>
    );
}

export default Transaction;