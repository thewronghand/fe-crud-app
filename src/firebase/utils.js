import { postsCollection } from "./index";
import {
  query,
  orderBy,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getRandomColorScheme } from "../utils/constants/miscellaneous";

const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));

const postUtils = {
  addPost: async function (user, title, content) {
    const newPost = {
      user,
      title,
      content,
      postId: "",
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
      colorScheme: getRandomColorScheme(),
    };
    try {
      const docRef = await addDoc(postsCollection, newPost);
      const postId = docRef.id;
      await updateDoc(doc(postsCollection, docRef.id), { postId });
      console.log(`Post with ID ${postId} added successfully.`);
    } catch (e) {
      console.error("Error : addPost failed");
      console.log(e);
    }
  },

  getPosts: async function (updater) {
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      updater(newPosts);
    });
    return unsubscribe;
  },

  updatePost: async function (id, title, content) {
    const postRef = doc(postsCollection, id);
    try {
      await updateDoc(postRef, {
        title: title,
        content: content,
        updatedAt: new Date().toLocaleString(),
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
