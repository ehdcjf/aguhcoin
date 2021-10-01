import { useState } from "react"

const SearchBox = ({handlePage,search,keyword}) => {
  const [tempKeyword,setTempKeyword] = useState('')
  const [tempSearch,setTempSearch] = useState('subject_content')
  
  const handleTempSearch = (e)=>{
    setTempSearch(e.target.value)
  }
  
  const handleTempKeyword = (e) =>{
    setTempKeyword(e.target.value)
  } 

  const handleSubmit= (e) =>{
    e.preventDefault();
    if(tempKeyword!=''){
      const data = {
        search:tempSearch,
        keyword:tempKeyword,
      }
      handlePage(data);
    }else{
      const data = {
        search:null,
        keyword:null,
      }
      handlePage(data);
    }
  }

  return (
    <div>
      <select onChange={handleTempSearch} value={'subject_content'}>
        <option value="subject_content" >제목+내용</option>
        <option value="subject" >제목</option>
        <option value="content">내용</option>
        <option value="writer">작성자</option>
      </select>
      <form action="" onSubmit={handleSubmit}>
      <input type="text" 
        value={tempKeyword}
        onChange={handleTempKeyword}
      />
        <button type='submit'>검색</button>
      </form>
    </div>
  );
}



export default SearchBox;