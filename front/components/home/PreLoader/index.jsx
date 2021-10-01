import styled from "styled-components";

const StyledPreLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #191919;
  color: #dbd8d6;

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  z-index: 1;

  h1 {
    font-size: 3vw;
    text-transform: uppercase;
    font-family: "Bai Jamjuree", sans-serif;
    font-weight: 600;
  }
  h2 {
    font-size: 1.5vw;
    text-transform: uppercase;
    font-family: "Bodoni Moda", sans-serif;
    font-style: italic;
    margin-top: 10px;
  }
`;

const PreLoader = () => {
  return (
    <StyledPreLoader className="absolute">
      <h1>President Maker</h1>
      <h2>since 2021</h2>
    </StyledPreLoader>
  );
};

export default PreLoader;
