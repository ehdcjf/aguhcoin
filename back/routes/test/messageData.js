
const notEnoughAsset = () => {
  return {
    success: false,
    msg: "자산이 충분하지 않음을 알려주는 메세지."
  }
}
const addOrder = () => {
  return {
    success: false,
    msg: "주문이 완료되었음을 알리는 메세지."
  }
}
const transaction = () => {
  return {
    success: false,
    msg: "자산이 충분하지 않음을 알려주는 메세지."
  }
}

module.exports = {
  notEnoughAsset,
  addOrder,
  transaction,
}