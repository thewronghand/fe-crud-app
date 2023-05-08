import { React, useState } from "react";
import styled from "styled-components";
import { postUtils } from "../firebase/utils";

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
    > .input_username_wrapper {
      display: flex;
      height: 40px;
      align-items: center;
      margin-bottom: 7px;
      > .input_username {
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
  > .update_button {
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

function EditForm({ modalCloseHandler, postDataProp }) {
  const [title, setTitle] = useState(postDataProp ? postDataProp.title : "");
  const [content, setContent] = useState(
    postDataProp ? postDataProp.content : ""
  );

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpdateButtonClick = async (postId) => {
    modalCloseHandler();
    await postUtils.updatePost(postId, title, content);
    console.log("post updated");
  };

  return (
    <ModalBackdrop onClick={modalCloseHandler}>
      <ModalView onClick={(event) => event.stopPropagation()}>
        <CloseButton onClick={modalCloseHandler}>X</CloseButton>
        <div className="input_area">
          <div className="input_title_wrapper">
            <textarea
              className="input_title"
              placeholder="your title here"
              onChange={handleTitleInputChange}
              rows="1"
            >
              {postDataProp ? postDataProp.title : null}
            </textarea>
          </div>
          <div className="input_content_wrapper">
            <textarea
              className="input_content"
              rows="8"
              placeholder="type something here"
              onChange={handleContentInputChange}
            >
              {postDataProp ? postDataProp.content : null}
            </textarea>
          </div>
        </div>
        <button
          className="update_button"
          onClick={() =>
            handleUpdateButtonClick(postDataProp.id, title, content)
          }
        >
          update
        </button>
        <button className="shadowBox">submit</button>
      </ModalView>
    </ModalBackdrop>
  );
}

export default EditForm;
