import { useSelector } from "react-redux";
import styles from "../styles/Trading.module.css";
import useInput from "../hooks/useInput";

const Sell = () => {
  const qty = useInput("");
  const price = useInput("");
  const { availableCoin, isLogin, useridx } = useSelector(
    (state) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price.value == "" || qty.value == "") {
      alert("매도가격과 주문수량은 필수 입력 사항입니다.");
    }

    const data = {
      price: price.value,
      qty: qty.value,
    };
    let url = `http://localhost:3500/exchange/sell`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    const result = await response.json();
    console.log("매수매도?", result);
    if (result.success) {
    } else if (!isLogin) {
      alert("로그인해주세요.");
    }
  };
  return (
    <>
      <ul className={styles.buy_contain}>
        <li>
          <a>매도 가능 코인</a>
          <h3 className={styles.possible_asset}>{availableCoin}</h3>
        </li>
        <li>
          <a>매도 가격(krw)</a>
          <input type="text" placeholder="매도 가격을 입력하세요" {...price} />
        </li>
        <li>
          <a>주문 수량</a>
          <input type="text" placeholder="주문 수량을 입력하세요" {...qty} />
        </li>
        <li>
          <a>주문 총액</a>
          <span>{qty.value * price.value}</span>
        </li>
        <button
          className={styles.buy_button}
          type="submit"
          onClick={handleSubmit}
        >
          매도하기
        </button>
      </ul>
    </>
  );
};
export default Sell;
