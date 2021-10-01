import styled from "styled-components";

const StyledFeatured = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;

  align-items: center;
  img {
    clip-path: inset(0% 0% 0% 0%);
    /* transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1);

    & .is-reveal {
      clip-path: inset(0%, 0%, 0%, 0%);
    } */
  }

  h6 {
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 500;
  }

  & > .featured_row_layout,
  & > .featurd_column_layout {
    display: grid;
    gap: 10px;
  }

  & > .featured_row_layout {
    grid-template-columns: repeat(2, auto);
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  & > .featurd_column_layout {
    grid-template-columns: 100px auto;
    align-items: flex-end;
    img {
      width: 100%;
      height: 125vh;
      object-fit: cover;
    }

    h6 {
      transform: translateX(100%) rotate(-90deg);
      transform-origin: left bottom;
      justify-self: self-end;
    }
  }
`;

const Featured = () => {
  return (
    <StyledFeatured data-scroll-section>
      <div className="featured_row_layout">
        <h6>이승만</h6>
        <img src="/1.png" data-scroll />
      </div>
      <div className="featurd_column_layout">
        <h6>윤보선</h6>
        <img src="/2.png" data-scroll />
      </div>
    </StyledFeatured>
  );
};

export default Featured;
