import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionAction } from "../reducers/wallet";

import styled from "styled-components";

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
  & > table > tbody > tr > td:nth-child(n + 3):nth-child(-n + 7) {
    text-align: right;
  }
  & > table > tbody > tr > td:nth-child(1),
  td:nth-child(8) {
    font-size: 12px;
    font-weight: lighter;
  }
  & > table > tbody > tr > td > span {
    margin-left: 5px;
    color: #999;
    font-size: 12px;
  }
`;

const TransactionList = () => {
  const dispatch = useDispatch();
  const { userid, useridx } = useSelector((state) => state.user);
  const { txList } = useSelector((state) => state.wallet);

  useEffect(() => {
    const data = {
      userid: userid,
      useridx: useridx,
    };

    dispatch(TransactionAction(data));
  }, []);

  const renderTxList = () => {
    if (txList != undefined) {
      return txList.map((e, k) => {
        return (
          <tr>
            <td>
              {/* 체결시간 */}
              <p></p>
            </td>
            <td>
              {/* 주문유형 */}
              {e.order_type == 0 ? (
                <div style={{ color: "red" }}>매수</div>
              ) : (
                <div style={{ color: "blue" }}>매도</div>
              )}
            </td>
            <td>
              {/* 거래수량 */}
              {e.qty}
              <span>AGU</span>
            </td>
            <td>
              {/* 거래단가 */}
              {e.price}
              <span>KRW</span>
            </td>
            <td>
              {/* 거래금액 */}
              {e.price}
              <span>KRW</span>
            </td>
            <td>
              {/* 수수료 */}

              <span>KRW</span>
            </td>
            <td>
              {/* 정산금액(수수료반영) */}

              <span>KRW</span>
            </td>
            <td>
              {/* 주문시간 */}
              <p>
                {new Date(e.order_date).getFullYear() +
                  "년 " +
                  (new Date(e.order_date).getMonth() + 1) +
                  "월 " +
                  new Date(e.order_date).getDate() +
                  "일"}
              </p>
              <p>
                {new Date(e.order_date).getHours() +
                  "시 " +
                  new Date(e.order_date).getMinutes() +
                  "분 " +
                  new Date(e.order_date).getSeconds() +
                  "초"}
              </p>
            </td>
          </tr>
        );
      });
    }
  };

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
        <tbody>{renderTxList()}</tbody>
      </table>
    </TransactionTable>
  );
};

export default TransactionList;
