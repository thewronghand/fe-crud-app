import { useState, useEffect } from "react";
import { postUtils } from "./firebase/utils";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentInputChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    let unsubscribe;
    postUtils
      .getPosts(setPosts)
      .then((fn) => (unsubscribe = fn))
      .catch((error) => console.error(error));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // async function addNewPost(title, content) {
  //   const newPost = {
  //     title,
  //     content,
  //     postId: "",
  //   };
  //   try {
  //     const docRef = await addDoc(postsCollection, newPost);
  //     const postId = docRef.id;
  //     await updateDoc(doc(postsCollection, docRef.id), { postId });
  //     console.log(`Post with ID ${postId} added successfully.`);
  //   } catch (e) {
  //     console.error("Error : addPost failed");
  //   }
  // }

  // async function deletePost(id) {
  //   try {
  //     await deleteDoc(doc(postsCollection, id));
  //     console.log("Post with ID " + id + " deleted successfully");
  //   } catch (e) {
  //     console.error("Error : deletePost failed", e);
  //   }
  // }

  // async function updatePost(id) {
  //   const postRef = doc(postsCollection, id);
  //   try {
  //     await updateDoc(postRef, {
  //       title: "updated title",
  //       content: "updated content",
  //     });
  //     console.log("Post with ID " + id + " updated successfully");
  //   } catch (e) {
  //     console.error("Error: updatePost failed", e);
  //   }
  // }

  const handleAddButtonClick = async (title, content) => {
    await postUtils.addPost(title, content);
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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleDeleteButtonClick(post.id)}>
              delete
            </button>
            <button onClick={() => handleUpdateButtonClick(post.id)}>
              update
            </button>
          </div>
        ))}
        <input placeholder="title" onChange={handleTitleInputChange}></input>
        <textarea
          placeholder="content"
          onChange={handleContentInputChange}
        ></textarea>
        <button onClick={() => handleAddButtonClick(title, content)}>
          add
        </button>
      </header>
    </div>
  );
}

export default App;
