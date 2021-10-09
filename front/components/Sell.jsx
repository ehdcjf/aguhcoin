import { useSelector } from "react-redux";
import styles from "../styles/Trading.module.css";
import useInput from "../hooks/useInput";

const Sell = () => {
  const { availableCoin } = useSelector((state) => state.user);
  const qty = useInput("");
  const price = useInput("");
  return (
    <>
      <ul className={styles.buy_contain}>
        <li>
          <a>매도 가능 코인</a>
          <h3 className={styles.possible_asset}>{availableCoin}</h3>
        </li>
        <li>
          <a>매도 가격(krw)</a>
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
        <button className={styles.buy_button}>매도하기</button>
      </ul>
    </>
  );
};
export default Sell;
