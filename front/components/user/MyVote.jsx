const MyVote = ({vote19,vote20,list}) => {
  const vote_19th = list[vote19];


  const renderVote20 = ()=>{
    return vote20.map((v,i)=>{
      return (
        <li key={i}>
          <div>{v.title}</div>
          <div>{v.voteAt}</div>
          <div style={{ backgroundImage: `url(${v.president_image})` }}></div>
          <h3>{v.president_name}</h3>
        </li>
      )
    })
  }



  return (
    <ul>
      <li>
      <div>19대 대선</div>
      <div style={{ backgroundImage: `url(${vote_19th.president_image})` }} />  
      <h3>{vote_19th.president_name}</h3>
      </li>
      {renderVote20()}
    </ul>
  );
}

export default MyVote;