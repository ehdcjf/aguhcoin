import { useState } from "react";
import { imageUpload } from "../../../components/api/joinRequest";
import { useRouter } from "next/router";
import { createRequest } from "../../../components/api/admin";
import Router from "next/router";

const create = () => {
  const router = useRouter();
  const { type } = router.query;
  const [name, setName] = useState("");
  const [image, setImage] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageURI = "default";
    if (image != undefined) {
      imageURI = await imageUpload(image);
      imageURI = `http://localhost:3002/` + imageURI;
    }

    const data = {
      type: type,
      name: name,
      image: imageURI,
    };
    const result = await createRequest(data);
    console.log(result);

    Router.push(`/admin/show/${type}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type === "party" ? (
          <span>정당 이미지</span>
        ) : (
          <span>정치인 이미지</span>
        )}
        <input type="file" onChange={handleImage} />
        <br />
        {type === "party" ? <span>정당 이름</span> : <span>정치인 이름</span>}
        <input
          type="text"
          onChange={handleName}
          placeholder="이름을 입력해주세요"
        />
        <br />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default create;
