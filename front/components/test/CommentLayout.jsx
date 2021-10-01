import React, { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";

const StyledCommentLayout = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 50px;
`;


const CommentLayout = ({ children }) => {
  useEffect(async () => {}, []);

  return <StyledCommentLayout>{children}</StyledCommentLayout>;
};

//ReactDOM
export default CommentLayout;
