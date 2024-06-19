import { successStatus } from '../../config/successStatus.js';
import { response } from '../../config/response.js';

import Post from '../models/post.model.js';
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not fount' });
    }
    res.status(200).json({ message: 'Post deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
