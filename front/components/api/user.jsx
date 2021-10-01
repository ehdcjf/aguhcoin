
export const showUser = async(data) =>{
  const id = data;
  const url = `http://localhost:3002/user?id=${id}`;
  const options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
}


export const deleteUser = async(data)=>{

  const id = data
  const url = `http://localhost:3002/user?id=${id}`;
  const options = {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result;

}

export const updateUser = async(data)=>{
  const { id,nickname,birth,gender,hometown,residence,image,vote19,vote20,show } = data;
  let url = `http://localhost:3002/user?id=${id}`;
  let options = {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      birth,
      gender,
      hometown,
      residence,
      image,
      vote19,
      vote20,
      show
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;

}