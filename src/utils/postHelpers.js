const PARTS_TO_IGNORE = ['date', 'slug', 'tags', 'title'];

export const getPostDate = (post) => {
  return post.find((part) => part.type === 'date');
};

export const getPostParts = (post) => {
  return post.filter((part) => !PARTS_TO_IGNORE.includes(part.type));
};

export const getPostTags = (post) => {
  return post.find((part) => part.type === 'tags');
};

export const getPostSlug = (post) => {
  return post.find((part) => part.type === 'slug');
};

export const getPostTitle = (post) => {
  return post.find((part) => part.type === 'title');
};
