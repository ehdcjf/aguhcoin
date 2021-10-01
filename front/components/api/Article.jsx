export const showArticle = async (data) => {
  const { board_id } = data;
  const url = `http://localhost:3002/board/${board_id}`;
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const createArticle = async (data) => {
  const { subject, body } = data;
  let url = "http://localhost:3002/board/write";
  let options = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      subject,
      content: body,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const deleteArticle = async (data) => {
  const { board_id, writer } = data;
  const url = `http://localhost:3002/board/${board_id}/${writer}`;
  const options = {
    method: "delete",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const updateArticle = async (data) => {
  const { subject, body, board_id, writer } = data;
  let url = `http://localhost:3002/board/${board_id}/${writer}`;
  let options = {
    method: "put",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      subject,
      content: body,
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const updatecheck = async (data) => {
  const { board_id } = data;
  let url = `http://localhost:3002/board/update/${board_id}`;
  let options = {
    method: "get",
    mode: "cors",
    credentials: "include",
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};
