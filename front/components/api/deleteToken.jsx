export const deleteToken = async () => {
  const url = `http://localhost:3002/user/logout`;
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  const result = await fetch(url, options);
  const data = await result.json();
  return data;
};
