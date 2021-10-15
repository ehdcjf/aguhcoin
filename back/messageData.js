
const notEnoughAsset = (data) => {
  return {
    success: false,
    msg: "자산이 충분하지 않습니다..",
    ...data,
  }
}

const notEnoughCoin = (data) => {
  return {
    success: false,
    msg: "코인이 충분하지 않습니다.",
    ...data,
  }
}
const addOrder = (data) => {
  return {
    success: true,
    msg: "주문이 완료되었음을 알리는 메세지.",
    ...data,
  }
}
const transaction = (data) => {
  return {
    success: true,
    msg: "일부 혹은 전체 주문이 체결 됨을 알려주는 메세지.",
    ...data,
  }
}

const errorMessage = (error) => {
  return {
    success: false,
    msg: "관리자에게 문의해주세요." + error.sqlMessage
  }
}

module.exports = {
  notEnoughAsset,
  notEnoughCoin,
  addOrder,
  transaction,
  errorMessage,
}