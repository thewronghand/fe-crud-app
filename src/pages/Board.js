import { useEffect } from "react";
import { postListState } from "../recoil/postList/postListAtom";
import { useRecoilState } from "recoil";
import { postUtils } from "../firebase/utils";
import Post from "../components/Post";
import InputForm from "../components/InputForm";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const PostListContainer = styled.main`
  width: 100%;
  top: 80px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.div`
  margin: 8px;
`;

const InputFormButton = styled.button`
  background-color: white;
  position: fixed;
  bottom: 50px;
  right: 50px;
  height: 70px;
  width: 70px;
  border-radius: 15px;
  border: 1px solid black;
  transition: transform 0.2s ease-in-out;
  z-index: 1;
  font-size: 1.5rem;
  &:hover {
    transform: translate(-5px, -5px);
  }
  &:active {
    background-color: #de3e7d;
    transform: translate(0, 0);
  }
`;

const ShadowBox = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  height: 70px;
  width: 70px;
  border-radius: 15px;
  border: 1px solid black;
  background-color: black;
`;

function Board() {
  const [postList, setPostList] = useRecoilState(postListState);
  const [inputFormOpen, setInputFormOpen] = useState(false);
  const openInputFormHandler = () => {
    setInputFormOpen(!inputFormOpen);
  };

  useEffect(() => {
    let unsubscribe;
    postUtils
      .getPosts(setPostList)
      .then((fn) => (unsubscribe = fn))
      .catch((error) => console.error(error));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const splitPostsIntoColumns = (posts) => {
    const columns = [[], [], []];
    for (let i = 0; i < posts.length; i++) {
      const columnIndex = i % 3;
      columns[columnIndex].push(posts[i]);
    }
    return columns;
  };

  const columns = splitPostsIntoColumns(postList);

  return (
    <PostListContainer>
      <InputFormButton
        className="inputForm-open_button"
        onClick={openInputFormHandler}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </InputFormButton>
      <ShadowBox>
        <FontAwesomeIcon icon={faPaperPlane} />
      </ShadowBox>
      {inputFormOpen ? (
        <InputForm modalCloseHandler={openInputFormHandler} />
      ) : null}
      <Columns>
        {columns.map((column, index) => (
          <Column key={index}>
            {column.map((post) => (
              <Post key={post.id} postData={post} />
            ))}
          </Column>
        ))}
      </Columns>
    </PostListContainer>
  );
}

export default Board;
