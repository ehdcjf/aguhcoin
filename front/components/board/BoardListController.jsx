import { useDispatch, useSelector } from "react-redux";
import { showList } from "../api/showList";
import { ShowListAction } from "../../reducers/board";
import Router from "next/router";
import RowBtn from '../board/RowBtn'
import BoardType from "./BoardType";
import { KAKAO_AUTH_URL } from "../../components/api/OAuth";
import {FaPen} from 'react-icons/fa'
import styled from "styled-components";

const StyledBoardListController=styled.div`
  display: flex;
  justify-content:space-between;

  &>div{
    display: flex;

    .write_btn{
    display: flex;
    font-size: 18px;
    font-family: 'ROKABold';
    cursor: pointer;
    padding: 7px 14px;
    border-radius: 5px;
    align-items: center;
  }
  }

`






const BoardListController = ({}) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const {IsLogin} = useSelector(state=>state.user);


  const handlePage = async (data) => {
    const updatePage = { ...board, ...data, };
    let url = `/board/list?type=${updatePage.type}&rows=${updatePage.rows}&page=${updatePage.page}`
    if(  updatePage.search!=null &&updatePage.keyword!=null) url+=`&search=${updatePage.search}&keyword=${updatePage.keyword}`
    const result = await showList(updatePage);
    if(result.success){
      dispatch(ShowListAction(result));

      Router.push(
        {
          pathname: `/board/list`,
          query: updatePage,
        },
        url,
        { shallow: true }
        );
      }else{
        alert(result.error); 
      }
  };

  const moveWrite = () =>{
    if(IsLogin){
    Router.push(`/board/write`);
    }else{
      if(confirm('로그인하시겠습니까?')){
        Router.push(`${KAKAO_AUTH_URL}`)
      }
    }
  }


  return (
    <StyledBoardListController>
        <BoardType
          handlePage={handlePage}
          type={board.type}
        />
        <div >
          <div className='write_btn' onClick={moveWrite}><FaPen size={18}/> 글쓰기</div>
          {/* <Link href="/board/write">
            <a>글쓰기</a>
          </Link> */}
          <RowBtn
            rows={board.rows}
            handlePage={handlePage}
          />
        </div>
    </StyledBoardListController>
  );
}

export default BoardListController;