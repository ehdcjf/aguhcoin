
const notEnoughAsset = () => {
  return {
    success: false,
    error: "자산이 충분하지 않음을 알려주는 메세지."
  }
}

module.exports = {
  notEnoughAsset,
}