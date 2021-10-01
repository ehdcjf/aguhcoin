export const showResult = async (data) => {
  const { gender, minage, maxage, hometown, residence, vote19 } = data;
  const response = await fetch(
    `http://localhost:3002/vote?gender=${gender}&minage=${minage}&maxage=${maxage}&hometown=${hometown}&residence=${residence}&vote19=${vote19}`
  );
  const result = await response.json();
  return result;
};

export const getLatestVote = async () => {
  const response = await fetch(`http://localhost:3002/vote/last`);
  const result = await response.json();
  return result;
};
