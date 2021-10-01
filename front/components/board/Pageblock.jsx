export const Pageblock = ({ pageblock, endpage, handlePage }) => {
  

  const renderPageBlock = () => {
    return pageblock.map((v, i) => {
      return (
        <button
          key={i}
          onClick={() => {
            handlePage({page:v});
          }}
        >
          {v}
        </button>
      );
    });
  };

  return (
    <>
      <button
        onClick={() => {
          handlePage({page:1});
        }}
      >
        처음
      </button>
      {renderPageBlock()}
      <button
        onClick={() => {
          handlePage({page:endpage});
        }}
      >
        끝
      </button>
    </>
  );
};
