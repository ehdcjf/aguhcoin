import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showList } from "../../components/api/showList";
import { ShowListAction } from "../../reducers/board";
import { Pageblock } from "../../components/board/Pageblock";
import Router from "next/router";
import SearchBox from "../../components/board/SearchBox";
import Layout from "../../containers/Layout";
import BoardListController from "../../components/board/BoardListController";

const List = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const {IsLogin} = useSelector(state=>state.user);

  useEffect(async () => {
    const queryStr = new URL(window.location.href).searchParams;
    const data = {
      type: queryStr.get("type"),
      rows: queryStr.get("rows"),
      page: queryStr.get("page"),
      search: queryStr.get("search"),
      keyword: queryStr.get("keyword"),
    };

    const result = await showList(data);
    console.log(result)
    if(result.success){
      dispatch(ShowListAction(result));
    }else{
      alert(result.error)
    }
  }, []);


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

 



  const renderList = (list) => {
    return list.map((v) => {
      return (
        <li key={v.board_id}>
          <span className='num'>{v.board_id}</span>
          <span className='subject'>
            <Link
              href="/board/view/:[board_id]"
              as={`/board/view/${v.board_id}`}
            >
              <a>{v.subject}
              {v.comment_cnt>0 && <span>
              [{v.comment_cnt}]
              </span>}
              </a>
            </Link>
          </span>
          <span className='writer'>{v.nickname}</span>
          <span className='date'>{v.createdAt}</span>
          <span className='hit'>{v.hit}</span>
          <span className='like'>{v.liked}</span>
        </li>
      );
    });
  };

  return (
    <Layout>
      <h1>자유게시판</h1>
      <div>
       <BoardListController/>
        <ul>
          
            <li className='head'>
              <span className='num'>글번호</span>
              <span className='subject'>제목</span>
              <span className='writer'>닉네임</span>
              <span className='date'>작성일</span>
              <span className='hit'>조회수</span>
              <span className='like'>추천수</span>
            </li>
          
          {renderList(board.list)}
        </ul>
      </div>
      <Pageblock
        pageblock={board.pageblock}
        endpage={board.endpage}
        handlePage={handlePage}
      />
      <SearchBox
        search={board.search}
        keyword={board.keyword}
        handlePage={handlePage}
      />
    </Layout>
  );
};

export default List;
