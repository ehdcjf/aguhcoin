import styled from "styled-components";
import gsap from "gsap";
import SplitText from "../../../utils/Split3.min.js";
import { useEffect } from "react";

const StyledMain = styled.section`
  position: relative;

  & > .header_menu {
    position: absolute;
    left: 0;
    top: 50px;
    letter-spacing: 1px;
    font-family: "Syncopate", sans-serif;
    color: #626262;
    text-transform: uppercase;
  }

  & > .header_menu > li {
    margin: 10px 0;
  }

  & > .header_text {
    font-size: 15vw;
    text-transform: uppercase;
    text-align: center;
    font-family: "Bai Jamjuree", sans-serif;
    font-weight: 600;
  }

  .lineParent {
    overflow: hidden;
  }
  .lineChildren {
    transform: translate(0, 500px);
  }
`;

const Main = () => {
  useEffect(() => {
    const split = new SplitText("#header_text", {
      type: "lines",
      linesClass: "lineChildren",
    });
    const splitParent = new SplitText("#header_text", {
      type: "lines",
      linesClass: "lineParent",
    });

    gsap.to(split.lines, {
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);

  return (
    <StyledMain data-scroll-section>
      {/* <ul className="header_menu">
        <li>Intro</li>
        <li>Vote</li>
        <li>Board</li>
      </ul> */}
      <h1 className="header_text" id="header_text">
        PRESIDENT MAKER
      </h1>
    </StyledMain>
  );
};

export default Main;
