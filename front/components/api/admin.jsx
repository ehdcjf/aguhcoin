export const showRequest = async (data) => {
  const { type } = data;
  const url = `http://localhost:3002/admin/election?type=${type}`;
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const createRequest = async (data) => {
  const { type, name, image } = data;
  let url = `http://localhost:3002/admin/election/${type}`;
  let options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      image,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const createElection = async (data) => {
  const { name, candidate,content } = data;
  let url = `http://localhost:3002/admin/election/table`;
  let options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      candidate,
      content,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};
