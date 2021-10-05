import styled from 'styled-components';

const CoinList = styled.div`
    & > h4 {
        padding: 10px;
        font-weight: normal;
    }

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
        text-align: right;
        border-bottom: 1px solid lightgray;
    }
    & > table > tbody > tr > td:nth-child(1) {
        font-size: 12px;
        font-weight: lighter;
        text-align: left;
    }

    & > table > tbody > tr > td > h5 {
        font-size: 15px;
    }

    & > table > tbody > tr > td > span {
        margin-left: 5px;
        color: #999;
        font-size: 12px;
    }

    & > table > tbody > tr > td > p > span {
        margin-left: 5px;
        color: #999;
        font-size: 12px;
    }
`

const MyCoinList = () => {
    return (
        <CoinList>
            <h4>보유코인 목록</h4>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="21.25%" />
                    <col width="10%" />
                    <col width="21.25%" />
                    <col width="21.25%" />
                    <col width="21.25%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>보유코인</th>
                        <th>보유수량</th>
                        <th>매수평균가</th>
                        <th>매수금액</th>
                        <th>평가금액</th>
                        <th>평가손익(%)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 백에서 넘어오는 값의 양에 따라 <tr>의 갯수 결정 */}
                    <tr>
                        <td>
                            <h5>악어</h5>
                            <p>AGU</p>
                        </td>
                        <td>
                            999,999,999
                            <span>AGU</span>
                        </td>
                        <td>
                            999
                            <span>KRW</span>
                        </td>
                        <td>
                            999,999
                            <span>KRW</span>
                        </td>
                        <td>
                            99,999
                            <span>KRW</span>
                        </td>
                        <td>
                            <p style={{ color: "red" }}>
                                + 1.14<span>%</span>
                            </p>
                            <p style={{ color: "red" }}>
                                + 99,999<span>KRW</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>악어</h5>
                            <p>AGU</p>
                        </td>
                        <td>
                            999,999,999
                            <span>AGU</span>
                        </td>
                        <td>
                            999
                            <span>KRW</span>
                        </td>
                        <td>
                            999,999
                            <span>KRW</span>
                        </td>
                        <td>
                            99,999
                            <span>KRW</span>
                        </td>
                        <td>
                            <p style={{ color: "blue" }}>
                                - 9.99<span>%</span>
                            </p>
                            <p style={{ color: "blue" }}>
                                - 999,999<span>KRW</span>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CoinList>
    );
}

export default MyCoinList;