import Post from '../models/post.model.js';
const getPostsLogic = async () => {
  return await Post.find({});
};

const getPostLogic = async (id) => {
  return await Post.findById(id);
};

const createPostLogic = async (postData) => {
  return await Post.create(postData);
};

const updatePostLogic = async (id, postData) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error('게시글이 없어요!');
  }
  await Post.findByIdAndUpdate(id, postData);
  return await Post.findById(id);
};

const deletePostLogic = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error('게시글이 없어요!');
  }
  await Post.findByIdAndDelete(id);
  return post;
};

export {
  getPostsLogic,
  getPostLogic,
  createPostLogic,
  updatePostLogic,
  deletePostLogic,
};
