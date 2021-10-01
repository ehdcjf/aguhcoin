import styled from "styled-components";
export const StyledJoinItem = styled.div`
  height: 75vh;
  padding: 10% 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > .isSelected {
      border: 1px solid blue;
      background-color: cyan;
    }
    

    &.profil_content{
      & > img {
        display: block;
        width: 200px;
        height: 200px;
        border-radius: 100px;
      }
      &>input{
        padding-top:50px ;
      }
    }

    &.gender_content{
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    &.vote_content{
      & > ul {
    display: flex;
    flex-wrap: wrap;
  }

  & > ul > li {
    text-align: center;

    &.isSelected {
      background-color: gold;
    }
  }

  & > ul > li > div > div {
    display: block;
    width: 15vw;
    height: 15vw;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
    }


  }
  .btn_box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;