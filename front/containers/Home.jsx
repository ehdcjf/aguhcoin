import { useState, useRef, useEffect } from "react";

import NavBar from "../components/home/NavBar";
import Footer from "../components/home/Footer";
import Main from "../components/home/Main/index";
import Featuerd from "../components/home/Featured/index";
import About from "../components/home/About/index";
import Gallery from "../components/home/Gallery/index";
import PreLoader from "../components/home/PreLoader";
import useLocoScroll from "../hooks/useLocoScroll";
import styled from "styled-components";
import Header from "../components/layout/Header";

const StyledHome = styled.div`
  padding: 0 5vw;
  background-color: #f5f0ec;
  
  section {
    padding: 100px 0;
  }
  .section_header {
    margin-bottom: 50px;
  }
`;

const Home = () => {
  const [preloader, setPreloader] = useState(true);
  const [timer, setTimer] = useState(1);

  document.addEventListener("DOMContentLoaded", function (event) {
    // wait until all the window (images, stylesheets, and links) are loaded
    window.onload = function () {
      // code goes here
      useLocoScroll();
    };
  });

  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
    setPreloader(false);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  });

  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  useEffect(() => {
    return () => {
      setPreloader(true);
    };
  }, []);

  return (
    <>
      {preloader ? (
        <PreLoader></PreLoader>
      ) : (
        <StyledHome>
          <div id="main-container" data-scroll-container>
            <NavBar />
            {/* <Main /> */}
            {/* <Header /> */}
            {/* <Featuerd /> */}
            {/* <About /> */}
            <Gallery />
            <Footer />
          </div>
        </StyledHome>
      )}
    </>
  );
};

export default Home;
