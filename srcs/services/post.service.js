import Post from '../models/post.model.js';
import { Student } from '../models/signupModel.js';
const getPostsLogic = async () => {
  return await Post.find({}).populate('writer');
};

const getPostLogic = async (post_id) => {
  try {
    const postData = await Post.findById(post_id);
    return await Post.populate(postData, { path: 'writer' });
  } catch (error) {
    throw error;
  }
};

const createPostLogic = async (postData, user_id) => {
  try {
    const user = await Student.findOne({ studentId: user_id });
    if (!user) {
      throw new Error('User not found');
    }
    return await Post.create({
      ...postData,
      writer: user,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
const updatePostLogic = async (postData, post_id) => {
  const post = await Post.findById(post_id);
  const announce = JSON.parse(postData.announce);

  if (!post) {
    throw new Error('post가 없어요');
  } else if (typeof announce !== 'boolean') {
    throw new Error('announce에는 true 또는 false만 넣을 수 있어요!');
  }
  await Post.findByIdAndUpdate(post_id, postData);
  const updatedPost = await Post.findById(post_id);
  return await Post.populate(updatedPost, { path: 'writer' });
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
