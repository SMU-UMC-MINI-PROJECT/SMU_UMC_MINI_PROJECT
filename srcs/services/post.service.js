import Post from '../models/post.model.js';
import { Student } from '../models/signupModel.js';
const getPostsLogic = async () => {
  return await Post.find({}).populate('writer');
};

const getPostLogic = async (post_id) => {
  const postData = await Post.findById(post_id);
  const userData = await Post.populate(postData, { path: 'writer' });
  return {
    Post: postData,
    User: userData,
  };
};

const createPostLogic = async (postData, user_id) => {
  try {
    const newPost = await Post.create(postData);
    const userData = Student.findById(user_id);
    return {
      Post: newPost,
      User: userData,
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const updatePostLogic = async (post_id, postData) => {
  const post = await Post.findById(post_id);
  const { announce } = postData;
  if (!post) {
    throw new Error('게시글이 없어요!');
  } else if (typeof announce !== 'boolean') {
    throw new Error('announce에는 true 또는 false만 넣을 수 있어요!');
  }
  await Post.findByIdAndUpdate(post_id, postData);
  const updatedPost = await Post.findById(post_id);
  const userData = await Post.populate(updatedPost, { path: 'writer' });
  return {
    Post: updatedPost,
    User: userData,
  };
};

const deletePostLogic = async (post_id) => {
  const post = await Post.findById(post_id);
  if (!post) {
    throw new Error('게시글이 없어요!');
  }
  await Post.findByIdAndDelete(post_id);
  return post;
};

export {
  getPostsLogic,
  getPostLogic,
  createPostLogic,
  updatePostLogic,
  deletePostLogic,
};
