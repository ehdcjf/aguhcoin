export const likeAction = async (data) => {
  let url = `http://localhost:3002/board/like`;
  let options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};
