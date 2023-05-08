import { React, useState } from "react";
import styled from "styled-components";
import { postUtils } from "../firebase/utils";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/login/loginAtom";
import auth from "../firebase/index";

const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 250px;
  height: 400px;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  > .input_area {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > .input_title_wrapper {
      display: flex;
      height: 87px;
      align-items: center;
      > .input_title {
        border: 1px solid black;
        border-radius: 5px;
        width: 200px;
      }
    }
    > .input_content_wrapper {
      height: 230px;
      > .input_content {
        border: 1px solid black;
        border-radius: 5px;
        width: 200px;
      }
    }
  }
  > .submit_button {
    align-self: flex-end;
    margin-top: -5px;
    margin-right: 23px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: white;
    transition: transform 0.2s ease-in-out;
    z-index: 2;
    &:hover {
      transform: translate(-3px, -3px);
    }
    &:active {
      background-color: #de3e7d;
      transform: translate(0, 0);
    }
  }
  > .shadowBox {
    bottom: 24px;
    position: absolute;
    align-self: flex-end;
    margin-top: -5px;
    margin-right: 23px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: black;
  }
`;

function InputForm({ modalCloseHandler }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useRecoilValue(userState);

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitButtonClick = async (user, title, content) => {
    modalCloseHandler();
    await postUtils.addPost(user, title, content);
    console.log("post added");
  };

  return (
    <ModalBackdrop onClick={modalCloseHandler}>
      <ModalView onClick={(event) => event.stopPropagation()}>
        <CloseButton onClick={modalCloseHandler}>X</CloseButton>
        <div className="input_area">
          <div className="input_title_wrapper">
            <input
              className="input_title"
              placeholder="your title here"
              onChange={handleTitleInputChange}
            ></input>
          </div>
          <div className="input_content_wrapper">
            <textarea
              className="input_content"
              rows="8"
              placeholder="type something here"
              onChange={handleContentInputChange}
            ></textarea>
          </div>
        </div>
        <button
          className="submit_button"
          onClick={() => handleSubmitButtonClick(user, title, content)}
        >
          submit
        </button>
        <button className="shadowBox">submit</button>
      </ModalView>
    </ModalBackdrop>
  );
}

export default InputForm;
