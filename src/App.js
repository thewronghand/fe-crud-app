import { useState, useEffect } from "react";
import { postUtils } from "./firebase/utils";
import { useRecoilState } from "recoil";
import { postListState } from "./recoil/postList/postListAtom";
import { filterPostListByUsername } from "./recoil/postList/postListSelectors";

function App() {
  const [postList, setPostList] = useRecoilState(postListState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
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

  const handleAddButtonClick = async (username, title, content) => {
    await postUtils.addPost(username, title, content);
    console.log("post added");
  };

  const handleDeleteButtonClick = async (postId) => {
    await postUtils.deletePost(postId);
    console.log("post deleted");
  };

  const handleUpdateButtonClick = async (postId) => {
    await postUtils.updatePost(postId);
    console.log("post updated");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            placeholder="search username"
            onChange={handleSearchKeywordChange}
          />
        </div>
      </header>
      <main>
        <input
          placeholder="username"
          onChange={handleUsernameInputChange}
        ></input>
        <input placeholder="title" onChange={handleTitleInputChange}></input>
        <textarea
          placeholder="content"
          onChange={handleContentInputChange}
        ></textarea>
        <button onClick={() => handleAddButtonClick(username, title, content)}>
          add
        </button>
        {postList.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <span>{`username : ${post.username}`}</span>
            <p>{post.content}</p>
            <button onClick={() => handleDeleteButtonClick(post.id)}>
              delete
            </button>
            <button onClick={() => handleUpdateButtonClick(post.id)}>
              update
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
