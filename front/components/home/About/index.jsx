import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import gsap from "gsap";
import SplitText from "../../../utils/Split3.min.js";
import { useEffect, useRef, useState } from "react";
import useOnScreen from "../../../hooks/useOnScreen";
import cn from "classnames";
const StyledAbout = styled.section`
  /* height: 100vh; */
  p {
    font-size: 4.375rem;
    line-height: 1.12;
    font-family: "East Sea Dokdo", cursive;
    opacity: 0;

    div {
      opacity: 0;
      transform: translate(0);
    }

    &.is-reveal {
      opacity: 1;
    }
  }
`;

const About = () => {
  const ref = useRef();
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);

  useEffect(() => {
    if (reveal) {
      const split = new SplitText("#headline", {
        type: "lines",
      });

      gsap.to(split.lines, {
        duration: 1,
        y: -20,
        opacity: 1,
        stagger: 0.1,
        ease: "power2",
      });
    }
  }, [reveal]);

  return (
    <StyledAbout data-scroll-section>
      <SectionHeader title="about" />
      <p ref={ref} id="headline" className={cn({ "is-reveal": reveal })}>
      음모론, 색깔론, 그리고 근거없는 모략, 이제 중단해 주십시오. 한나라당과 조선일보가 합작해서 입을 맞춰 헐뜯는 것 방어하기도 힘이 듭니다. 제 장인은 좌익활동 하다 돌아가셨습니다. 해방되는 해 실명해서 앞을 못 봐 무슨 일을 얼마나 했는지 모르겠지만 결혼 한참 전에 돌아가셨습니다. 저는 그 사실 알고도 결혼했습니다. 그래도 아이들 잘 키우고 잘 살고 있습니다. 뭐가 잘못됐다는 겁니까. 이런 아내를 버려야겠습니까? 그러면 대통령 자격 생깁니까?
이 자리에서 여러분이 심판해 주십시오. 여러분이 자격이 없다고 하신다면 대통령 후보 그만두겠습니다. 여러분이 하라고 하면 열심히 하겠습니다.
      </p>
    </StyledAbout>
  );
};

export default About;
