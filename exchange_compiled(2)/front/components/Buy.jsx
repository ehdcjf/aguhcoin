import useInput from "../hooks/useInput";

import styles from "../styles/Trading.module.css";
import { useSelector } from "react-redux";

const Buy = () => {
  const qty = useInput("");
  const price = useInput("");
  const { availableAsset, isLogin, useridx } = useSelector(
    (state) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const priceInput = document.getElementById("priceInput");
    // const qtyInput = document.getElementById("qtyInput");

    if (price.value == "" || qty.value == "") {
      alert("매수가격과 주문수량은 필수 입력 사항입니다.");
    } else if (!isLogin) {
      alert("로그인해주세요.");
    }

    const data = {
      price: price.value,
      qty: qty.value,
    };

    let url = `http://localhost:3500/exchange/buy`;
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
    } else {
    }
  };

  return (
    <>
      <ul className={styles.buy_contain}>
        <li>
          <a>주문 가능액</a>
          <h3 className={styles.possible_asset}>{availableAsset}</h3>
        </li>
        <li>
          <a>매수 가격(krw)</a>
          <input type="text" placeholder="매수 가격을 입력하세요" {...price} />
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
          매수하기
        </button>
      </ul>
    </>
  );
};

export default Buy;
