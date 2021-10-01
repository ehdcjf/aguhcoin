import axios from "axios";

export const imageUpload = async (image) => {
  let imageURL;
  const fd = new FormData();
  fd.append("image", image);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  await axios
    .post(`http://localhost:3002/api/image`, fd, config)
    .then((res) => {
      console.log(res.data);
      imageURL = res.data;
    })
    .catch((error) => {
      console.log(error.response);
    });

  return imageURL;
};

export const joinRequest = async (data) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const response = await axios.post(
      `http://localhost:3002/user`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    const data = { success: false, error: e };
    return data;
  }
};

export const nicknameCheck = async (data) => {
  const nickname = data.nickname;
  const url = `http://localhost:3002/user/join/${nickname}`;
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();

  return result;
};
