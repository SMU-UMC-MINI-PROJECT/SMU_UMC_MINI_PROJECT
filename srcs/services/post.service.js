import Post from '../models/post.model.js';
const getPostsLogic = async () => {
  return await Post.find({});
};

const getPostLogic = async (id) => {
  return await Post.findById(id);
};

const createPostLogic = async (postData) => {
  try {
    const newPost = await Post.create(postData);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const updatePostLogic = async (id, postData) => {
  const post = await Post.findById(id);
  const { announce } = postData;
  if (!post) {
    throw new Error('게시글이 없어요!');
    // 게시글 수정시에는 생성과 달리 enum 타입이 기능을 못해서 에러 체킹을 여기서 해줌
  } else if (announce !== 'true' && announce !== 'false') {
    throw new Error('announce에는 true 또는 false만 넣을 수 있어요!');
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
