import { successStatus } from '../../config/successStatus.js';
import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';

import {
  getPostsLogic,
  getPostLogic,
  createPostLogic,
  updatePostLogic,
  deletePostLogic,
} from '../services/post.service.js';

const getPosts = async (req, res, next) => {
  try {
    const posts = await getPostsLogic();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getPostLogic(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await createPostLogic(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await updatePostLogic(id, req.body);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePostLogic(id);
    res.status(200).json({ message: successStatus.ISSUCCESS });
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
