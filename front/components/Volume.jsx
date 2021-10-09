import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Volume.module.css";

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
      return <div>없음</div>;
    }
  }
  useEffect(() => {
    renderTxList();
  });
  return (
    <>
      <div className={styles.volume}>
        <span>
          <a>체결</a>
        </span>
        <table className={styles.table}>
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
    </>
  );
};

export default Volume;
