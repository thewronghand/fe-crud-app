import { postsCollection } from "./index";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const postUtils = {
  addPost: async function (title, content) {
    const newPost = {
      title,
      content,
      postId: "",
    };
    try {
      const docRef = await addDoc(postsCollection, newPost);
      const postId = docRef.id;
      await updateDoc(doc(postsCollection, docRef.id), { postId });
      console.log(`Post with ID ${postId} added successfully.`);
    } catch (e) {
      console.error("Error : addPost failed");
    }
  },

  getPosts: async function (updater) {
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      updater(newPosts);
    });
    return unsubscribe;
  },

  updatePost: async function (id) {
    const postRef = doc(postsCollection, id);
    try {
      await updateDoc(postRef, {
        title: "updated title",
        content: "updated content",
      });
      console.log("Post with ID " + id + " updated successfully");
    } catch (e) {
      console.error("Error: updatePost failed", e);
    }
  },

  deletePost: async function (id) {
    try {
      await deleteDoc(doc(postsCollection, id));
      console.log("Post with ID " + id + " deleted successfully");
    } catch (e) {
      console.error("Error : deletePost failed", e);
    }
  },
};

const tagUtils = {};

export { postUtils, tagUtils };
