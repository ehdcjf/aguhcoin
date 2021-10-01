export const showList = async (data) => {
  const { type, search, keyword, rows, page } = data;
  const response = await fetch(
    `http://localhost:3002/board/list?type=${type}&search=${search}&keyword=${keyword}&rows=${rows}&page=${page}`
  );
  const result = await response.json();
  return result;
};
