import { selector } from "recoil";
import { postListState } from "./postListAtom";

export const filterPostListByUsername = selector({
  key: "filterPostListByUsername",
  get: ({ get }, username) => {
    const posts = get(postListState);
    return posts.filter((post) => post.username === username);
  },
});
