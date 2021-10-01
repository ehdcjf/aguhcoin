import {  useEffect } from "react";
import  Router  from "next/router";

const Logout = () => {

  useEffect(() => {
    window.localStorage.clear();
    setTimeout(() => {
      Router.back();
    }, 1000);
  }, []);

  return <>logout</>;
};

export default Logout;
