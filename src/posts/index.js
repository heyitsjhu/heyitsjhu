import * as PostUtils from "../utils/postHelpers";

import Article from "./2020/07/10/test.json";
import Article2 from "./2020/07/10/test2.json";
import Article3 from "./2020/07/10/test3.json";
import Article4 from "./2020/07/10/test4.json";
import Article5 from "./2020/07/10/test5.json";

const posts = [Article, Article2, Article3, Article4, Article5];

export const getPosts = (posts, sortOrder = "desc") => {
  return posts.sort((postA, postB) => {
    const postADate = PostUtils.getPostDate(postA);
    const postBDate = PostUtils.getPostDate(postB);

    if (postADate.value < postBDate.value) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (postADate.value > postBDate.value) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export default getPosts(posts);
