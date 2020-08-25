const PARTS_TO_IGNORE = ["date", "slug", "tags", "title", "coverImage"];

export const getPostDate = (post) => {
  return post ? post.find((part) => part.type === "date") : post;
};

export const getPostParts = (post) => {
  return post
    ? post.filter((part) => !PARTS_TO_IGNORE.includes(part.type))
    : post;
};

export const getPostTags = (post) => {
  return post ? post.find((part) => part.type === "tags") : post;
};

export const getPostSlug = (post) => {
  return post ? post.find((part) => part.type === "slug") : post;
};

export const getPostTitle = (post) => {
  return post ? post.find((part) => part.type === "title") : post;
};

export const getPostDescription = (post) => {
  return post ? post.find((part) => part.type === "content") : post;
};

export const getPostCoverImage = (post) => {
  return post ? post.find((part) => part.type === "coverImage") : post;
};
