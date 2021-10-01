import Router from "next/router";

const QuitUser = () => {

  const moveBack = ()=>{
    Router.back();
  }


  return (
    <div>
      <h2>탈퇴한 회원입니다.</h2>
      <span onClick={moveBack}>뒤로가기</span>

    </div>
  );
}

export default QuitUser;