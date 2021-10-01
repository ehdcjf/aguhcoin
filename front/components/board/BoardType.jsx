import styled from "styled-components";
import {FaHotjar} from 'react-icons/fa'
import cn from "classnames";
const StyledBoardTypeBtn = styled.div`
  &>div{
    display: inline-block;
    margin-right:5px;
    font-size: 18px;
    font-family: 'ROKABold';
    cursor: pointer;
    padding: 7px 14px;
    border-radius: 5px;
  
    &.isClicked{
      background-color:#C49F82;
    }

  }


`


const BoardType = ({handlePage,type}) => {
  return (
    <StyledBoardTypeBtn>
      <div onClick={()=>{handlePage({type:'all'})}} className={cn({isClicked:(type=='all')})}>전체글</div>
      <div onClick={()=>{handlePage({type:'hot'})}} className={cn({isClicked:(type=='hot')})}><FaHotjar color="red"/>인기글</div>
    </StyledBoardTypeBtn>
  );
}

export default BoardType;