import styled from "styled-components";
import NavBar from "../components/home/NavBar";

const StyledWrap = styled.div`
  width: 100vw;
  height: auto;
  overflow: hidden;
  padding: 0 5vw;
  background-color: #f5f0ec;



 

`;

const StyledContainer = styled.div`
  width: 60vw;
  height: auto;
  margin: 0 auto;
  overflow: hidden;

  &>h1{
    font-size: 36px;
    padding: 20px 0;
  }

  @media screen and (max-width:768px){
    width: 100vw;
  }
`;

const BoardLayout = ({ children }) => {
  return (
    <StyledWrap>
      <NavBar/>
      <StyledContainer>
        {children}
      </StyledContainer>
    </StyledWrap>
  );
};

export default BoardLayout;
