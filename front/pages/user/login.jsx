import FormLayout from "../../components/FormLayout";
import Head from "next/head";
import Router from "next/router";
import useInput from "../../hooks/useInput";
import { useDispatch,useSelector } from "react-redux";
import { UserLoginAction } from "../../reducers/user";
import { useEffect } from "react";


const Login = () => {
  const dispatch = useDispatch();
  const {loadding,IsLogin} = useSelector((state)=>state.user)


  const userid = useInput("");
  const userpw = useInput("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      userid:userid.value, 
      userpw:userpw.value
    }
     await dispatch(UserLoginAction(data))
          
    // userid.value === "1234" && userpw.value === "1234"
    //   ? Router.push("/")
    //   : alert("아이디와 패스워드가 다릅니다.");

    
  };

  useEffect(()=>{
    IsLogin === true 
    ? Router.push('/')
    : alert('아이디와 패스와드가 다릅니다.')
  },[IsLogin])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <FormLayout>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" {...userid} placeholder="아이디를 입력해주세요" />
          <input
            type="password"
            {...userpw}
            placeholder="패스워드를 입력해주세요"
          />
          {loadding? "로딩중" :<button type="submit">로그인</button>} 
        </form>
      </FormLayout>
    </>
  );
};

export default Login;
