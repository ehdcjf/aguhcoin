import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";


const Volumes = styled.div`
  
.volume{
    width: 1000px;
    height: 400px;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 20px auto;
    background: white;
}

.volume>span>a{
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ededed;
    text-align: center;
    color: black;
    border-bottom: 3px solid crimson;
    padding: 10px;
}

.table{
    width: 100%;
    padding: 10px;
}

.table>thead>tr>td{
    border-bottom: 1px solid black;
    text-align: center;
}

.table>tbody>tr>td{
    text-align: center;
    padding: 2px;
    border-bottom: 1px solid #ededed;
}
`
const Volume = () => {
  const { txList } = useSelector((state) => state.exchange);

  function renderTxList() {
    if (txList.length > 0) {
      return txList.slice(0, 10).map((e, k) => {
        return (
          <tr key={k}>
            <td>{e.tx_date}</td>
            <td>{e.price}</td>
            <td>{e.buy_commission}</td>
            <td>{e.price * e.buy_commission}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>없음</td>
        </tr>
      )
    }
  }
  useEffect(() => {
    renderTxList();
  });
  return (
    <Volumes>
      <div className="volume">
        <span>
          <a>체결</a>
        </span>
        <table className="table">
          <thead>
            <tr>
              <td>체결시간</td>
              <td>체결가격</td>
              <td>체결량(AGU)</td>
              <td>체결금액(KRW)</td>
            </tr>
          </thead>
          <tbody>{renderTxList()}</tbody>
        </table>
      </div>
    </Volumes>
  );
};

export default Volume;
