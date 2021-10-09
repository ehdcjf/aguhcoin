import useInput from "../hooks/useInput";

import styles from "../styles/Trading.module.css";
import { useSelector } from "react-redux";
const Buy = () => {
  const qty = useInput("");
  const price = useInput("");

  const { availableAsset } = useSelector((state) => state.user);
  return (
    <>
      <ul className={styles.buy_contain}>
        <li>
          <a>주문 가능액</a>
          <h3 className={styles.possible_asset}>{availableAsset}</h3>
        </li>
        <li>
          <a>매수 가격(krw)</a>
          <input type="text" />
        </li>
        <li>
          <a>주문 수량</a>
          <input type="text" />
        </li>
        <li>
          <a>주문 총액</a>
          <input type="text" />
        </li>
        <button className={styles.buy_button}>매수하기</button>
      </ul>
    </>
  );
};

export default Buy;
