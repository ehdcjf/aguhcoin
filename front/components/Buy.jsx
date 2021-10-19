import useInput from "../hooks/useInput";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { UpdateLockedAsset } from "../reducers/user";


const Buys = styled.div`
  .trading{
    width: 50%;
    height: 500px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid black;
    background: white;
    position: relative;
}

/* .sub_header> span > a {
    padding: 2px;
    box-sizing: border-box;
    display: inline-block;
    width: 100px;
    height: 40px;
    border: 1px solid #ededed;
    text-align: center;
    color: black;
    border-bottom: 3px solid crimson;
    font-size: 19px;
} */

.sub_header{
    padding: 3px;
    box-sizing: border-box;
    display: inline-block;
    width: 100px;
    height: 40px;
    border: 1px solid #ededed;
    text-align: center;
    color: #222;
    font-size: 18px;
}

.sub_header:hover{
    cursor: pointer;
    border-bottom: 3px solid crimson;

}

/* 매수 */
.buy_contain{
    width: 100%;
    height: 400px;
    margin-top: 70px;
    padding: 4px;
}
.possible_asset{
    display: inline-block;
}

.buy_contain>li{
    display: flex;
    padding: 9px;
    margin-top: 10px; 
}

.buy_contain>li>a{
    line-height: 40px;
    height: 25px;
    font-size: 14px;
    width: 130px;
    color: gray;
    
}

.buy_contain>li>input{
    width: 280px;
    height: 35px;
    border: 2px solid #ededed;
}
.cf{
    margin-top: 20px;
    /* padding: 8px; */
    width: 420px;
    font-size: 8px;
    display: inline-block;
    text-align: right;
}

.buy_button{
    width: 250px;
    height: 34px;
    padding: 4px;
    box-sizing: border-box;
    background: crimson;
    border: none;
    color: white;
    border-radius: 4px;
    display: inline-block;
    position: relative;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
}
.buy_button:hover{
    cursor: pointer;
    background: rgb(185, 17, 51);
}

.hi{
    color: turquoise;
}
`
const Buy = () => {
  const qty = useInput("");
  const price = useInput("");
  const { availableAsset, isLogin, useridx, } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(availableAsset)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const priceInput = document.getElementById("priceInput");
    // const qtyInput = document.getElementById("qtyInput");

    if (price.value == "" || qty.value == "") {
      alert("매수가격과 주문수량은 필수 입력 사항입니다.");
      return; 
    } 
    if (!isLogin) {
      alert("로그인해주세요.");
      return ; 
    } 
    if (availableAsset < qty.value * price.value) {
      alert("주문 총액이 주문 가능액을 초과하였습니다.");
      return; 
    } 

      const data = {
        price: price.value,
        qty: qty.value,
        user_idx: useridx,
      };
      const server = process.env.NEXT_PUBLIC_APP_SERVER_URI || "http://3.34.76.79:3500"; 
      let url = server+`/exchange/buy`;
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
      const result = await response.json();
      alert(result.msg);
      dispatch(UpdateLockedAsset(result))
      
  };

  return (
    <Buys>
      <ul className="buy_contain">
        <li>
          <a>주문 가능액</a>
          <h3 className="possible_asset">{availableAsset}</h3>
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
          className="buy_button"
          type="submit"
          onClick={handleSubmit}
        >
          매수하기
        </button>
      </ul>
    </Buys>
  );
};

export default Buy;
