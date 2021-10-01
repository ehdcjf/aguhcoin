import { imageUpload } from "../../components/api/joinRequest";
import { StyledJoinItem } from "./joinItem";

const ProfilImage = ({ value, onComplete, prev,next,handleNext,handlePrev }) => {
  const handleImage = async (e) => {
    const imageURI = await imageUpload(e.target.files[0]);
    onComplete("http://localhost:3002/" + imageURI);
  };

  return (
    <StyledJoinItem>
      <h1>프로필사진</h1>
      <div className='content profil_content'>
      <img src={value} alt="프로필 사진" />
      <input type="file" onChange={handleImage} />
      </div>

      <div className='btn_box'>
        <button onClick={handlePrev}>
          {prev}
        </button>
          <button onClick={handleNext}>
            {next}
          </button>
        
      </div>
    </StyledJoinItem>
  );
};

export default ProfilImage;
