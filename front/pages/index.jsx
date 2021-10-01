import BlogLayout from "../components/BlogLayout";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { UserLogoutAction } from "../reducers/user";
import { deleteToken } from "../components/api/deleteToken";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

const Home = dynamic(() => import("../containers/Home"), {
  ssr: false,
});

const Index = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const logout = new URL(window.location.href).searchParams.get("logout");
    if (logout == "success") {
      const result = await deleteToken();
      if (result.isLogout) dispatch(UserLogoutAction());
      Router.push("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Home />
    </>
  );
};

export default Index;
