import WalletLayout from '../../../components/layout/WalletLayout';
import Head from 'next/head';
import Router from 'next/router';
import styled from 'styled-components';

const MyCoins = styled.div`
    display: flex;
    flex-direction: column;
    height: 250px;
    padding: 20px;
    color: gray;
    border-bottom: 2px solid #eee;

    p {
        font-size: 20px;
        font-weight: 600;
        color: #000;
        
    }
    span {
        margin-left: 10px;
        font-size: 12px;
        font-weight: normal;
        color: #999;
    }
`

const FirstRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 30%;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;

    & > div {
        display: flex;
        flex-direction: row;
        width: 50%;
        padding: 0 20px;
        align-items: center;
    }
    & > div:last-child {
        border-left: 1px solid #eee;
    }

    & > div > div {
        width: 50%;
    }
`

const SecondRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 70%;

    & > div {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 20px;
    }

    & > div > div {
        display: flex;
        flex-direction: row;
        height: 100%;
        padding: 0 20px;
        align-items: center;
    }
    & > div:last-child > div {
        border-left: 1px solid #eee;
    }

    & > div > div > div {
        width: 50%;
    }
`

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
const MyCoin = () => {
    return (
        <>
            <Head>
                <title>악어코인 | 내 지갑</title>
            </Head>
            <WalletLayout>
                <MyCoins>
                    <FirstRow>
                        <div>
                            <div>보유 KRW</div>
                            <div>
                                <p>999,999,999,999<span>KRW</span></p>
                            </div>
                        </div>
                        <div>
                            <div>총 보유자산</div>
                            <div>
                                <p>999,999,999,999<span>KRW</span></p>
                            </div>
                        </div>
                    </FirstRow>
                    <SecondRow>
                        <div>
                            <div>
                                <div>총매수금액</div>
                                <div>
                                    <p>999,999,999,999<span>KRW</span></p>
                                </div>
                            </div>
                            <div>
                                <div>총평가금액</div>
                                <div>
                                    <p>-<span>KRW</span></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>총평가손익</div>
                                <div>
                                    <p>-<span>KRW</span></p>
                                </div>
                            </div>
                            <div>
                                <div>총평가수익률</div>
                                <div>
                                    <p>-<span>%</span></p>
                                </div>
                            </div>
                        </div>
                    </SecondRow>
                </MyCoins>
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
                                    <p style={{color:"red"}}>
                                        + 1.14<span>%</span>
                                    </p>
                                    <p style={{color:"red"}}>
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
                                    <p style={{color:"blue"}}>
                                        - 9.99<span>%</span>
                                    </p>
                                    <p style={{color:"blue"}}>
                                        - 999,999<span>KRW</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CoinList>
            </WalletLayout>
        </>
    );
}

export default MyCoin;