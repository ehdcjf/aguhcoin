import styled from "styled-components";
import NavBar from "../home/NavBar";


const StyledWrap = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 5vw;
  background-color: #f5f0ec;
`;

const StyledContainer = styled.div`
  width: 60vw;
  height: auto;
  margin: 0 auto;
  overflow: hidden;

  &>h1{
    font-family: 'ROKABold';
    font-size: 36px;
    padding: 20px 0;
  }
`;

const InfoLayout = ({ children }) => {
  return (
    <StyledWrap>
      <NavBar/>
      <StyledContainer>
        <h1>회원정보</h1>
        {children}
      </StyledContainer>
    </StyledWrap>
  );
};

export default InfoLayout;
