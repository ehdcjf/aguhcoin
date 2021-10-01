import styled from "styled-components";

const StyledSectionHeader = styled.h6`
  margin-bottom: 50px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-family: "Syncopate", sans-serif;
  color: #626262;
`;

const SectionHeader = ({ title }) => {
  return <StyledSectionHeader>{title}</StyledSectionHeader>;
};

export default SectionHeader;
