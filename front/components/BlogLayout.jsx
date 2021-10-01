// import Link from "next/link";
// import NavToggle from "./NavToggle";
import Header from "./layout/Header";
import styled from "styled-components";
const StyledWrap = styled.div`
  /* width: 100%; */
  height: auto;
  overflow: hidden;
`;

const BlogLayout = ({ children }) => {
  return (
    <>
      <Header />
      <StyledWrap>{children}</StyledWrap>
      <div className="footer">copyright &copy; all reserved</div>
    </>
  );
};

export default BlogLayout;
