import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import gsap from "gsap";
import SplitText from "../../../utils/Split3.min.js";
import { useEffect, useState, useRef } from "react";
import useOnScreen from "../../../hooks/useOnScreen";
import cn from "classnames";
const StyledFooter = styled.section`
  padding-bottom: 100px;
  height: 90vh;
  text-align: center;
  position: relative;

  *{
    border: none;
  }

  .silhouette_container{
    margin:0 auto;
    width: 100vw;
    height: 100vh;
    top:100px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  

  .silhouette{
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 40%;
    height: 40%;
  }

  

  



  .location {
    font-size: 10vw;
    text-transform: uppercase;
    font-family: "Bodoni Moda", serif;
    opacity: 0;

    &.is-reveal {
      opacity: 1;
    }
  }
`;
const Footer = () => {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);

  useEffect(() => {
    if (reveal) {
      const split = new SplitText("#location-text", {
        type: "lines",
        linesClass: "lineChildren",
      });
      const splitParent = new SplitText("#location-text", {
        type: "lines",
        linesClass: "lineParent",
      });

      gsap.fromTo(
        split.lines,
        { y: 200 },
        {
          duration: 1,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2",
        }
      );
    }
  }, [reveal]);

  return (
    <StyledFooter data-scroll-section>
      
      <div className='silhouette_container'>
          <SectionHeader className='grid_5' title="Who is Next" />
 
          <div className='silhouette posi2'  style={{ backgroundImage: `url(/투명재명.png)` }}></div>
          <div className='silhouette posi1'  style={{ backgroundImage: `url(/투명석열.png)` }}></div>
          <div className='silhouette posi3'  style={{ backgroundImage: `url(/투명낙연.png)` }}></div>
          <div className='silhouette posi4'  style={{ backgroundImage: `url(/투명준표.png)` }}></div>

        <div className='slhouette_second'>
              당신의 후보에게 투표하세요.
        </div>


      </div>
      <h1
        className={cn("location", { "is-reveal": reveal })}
        id="location-text"
        ref={ref}
      >
        
      </h1>
    </StyledFooter>
  );
};

export default Footer;
