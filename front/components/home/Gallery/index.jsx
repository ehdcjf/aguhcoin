import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { images } from "./image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import cn from "classnames";
import useOnScreen from "../../../hooks/useOnScreen";

const StyledGallery = styled.section`
  background-color: #d53f41;
  background-color: #f5f0ec; //배경
  background-color: #a89b91; //보색
  background-color: #755f4d; //단색
  background-color: #9198a8; //분할보색
  margin-left: -5vw;
  margin-right: -5vw;
  position: relative;

  .gallery_counter {
    position: absolute;
    top: 10%;
    left: 100px;
    z-index: 1;
    mix-blend-mode: difference;
    line-height: 16px;
    color: #dbd8d6;
    font-family: "Bai Jamjuree", sans-serif;
    font-weight: 600;
    font-size: 16px;
    display: inline-block;
  }

  .divider {
    content: "";
    background-color: white;
    width: 6.25vw;
    margin: 7px 10px;
    height: 1px;
    display: inline-block;
  }

  .gallery {
    height: 80vh;
    padding: 10vh 0;
    width: 1200%;
    display: flex;
    flex-wrap: nowrap;
  }
`;

const StyledGalleryItem = styled.div`
  &.gallery_item_wrapper {
    aspect-ratio: 16/9;
    height: 100%;
    display: grid;
    grid-template-columns: 20vw 1fr 200px;
    width: 100vw;
  }

  &.is-reveal {
    .gallery_image {
      transform: scale(1);
      filter: none;
    }
  }

  .gallery_item {
    width: 100%;
    height: 100%;
    position: relative;
    will-change: transform;
  }
  .gallery_info {
    position: absolute;
    bottom: 10%;
    z-index: 1;
    transform: translateX(-20%);
    color: #dbd8d6;

    .gallery_order{
      line-height: 3vw;
      font-family: '국립박물관문화재단클래식B';
      font-weight: 600;
      font-size: 3vw;
      margin-bottom: 4vh;
    }

    .gallery_title {
      line-height: 6vw;
      font-family: 'GowunBatang-Bold';
      font-weight: 600;
      font-size: 6vw;
      margin-bottom: 6vh;
    }
    .gallery_term {
      position: relative;
      line-height: 5vw;
      font-family: 'GowunBatang-Bold';
      color: transparent;
      font-weight: 400;
      font-size: 5vw;
      -webkit-text-stroke: 2px #dbd8d6;
    }
  }

  .gallery_image {
    background-size: cover;
    background-position: center;
    transform-origin: center;
    width: 50%;
    height: 130%;
    margin-left: 30vw;
    will-change: transform;
    transform: scale(0.7);
    transition: all 1.5s cubic-bezier(0.77, 0, 0.175, 1);
    filter: grayscale(100%) sepia(20%) brightness(80%);
  }
`;

const GalleryItem = ({ src, title, term, updateActiveImage, index,order }) => {
  const ref = useRef(null);

  const onScreen = useOnScreen(ref, 0.5);
  useEffect(() => {
    if (onScreen) {
      updateActiveImage(index);
    }
  }, [onScreen, index]);

  return (
    <StyledGalleryItem
      className={cn("gallery_item_wrapper", { "is-reveal": onScreen })}
      ref={ref}
    >
      <div />
      <div className="gallery_item">
        <div className="gallery_info">
          <h3 className='gallery_order'>{order}</h3>
          <h1 className="gallery_title">{title}</h1>
          <h6 className="gallery_term">{term}</h6>
        </div>
        <div
          className="gallery_image"
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      </div>
      <div />
    </StyledGalleryItem>
  );
};

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const sections = gsap.utils.toArray(".gallery_item_wrapper");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          start: "top top",
          trigger: ref.current,
          scroll: "#main-container",
          pin: true,
          scrub: 0.5,
          span: 1 / sections.length,
          end: () => `+=${document.body.clientWidth * 10}`,
        },
      });
      ScrollTrigger.refresh();
    });
    return () => {
      ScrollTrigger.defaults();
    };
  }, []);

  return (
    <StyledGallery data-scroll-section>
      <div className="gallery" ref={ref}>
        <div className="gallery_counter">
          <span>{activeImage}</span>
          <span className="divider" />
          <span>{images.length}</span>
        </div>
        {images.map((image, index) => {
          return (
            <GalleryItem
              key={index}
              index={index}
              {...image}
              updateActiveImage={(index) => setActiveImage(index + 1)}
            />
          );
        })}
      </div>
    </StyledGallery>
  );
};

export default Gallery;
