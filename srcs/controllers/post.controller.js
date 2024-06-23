import { successStatus } from '../../config/successStatus.js';
import { errStatus } from '../../config/errorStatus.js';
import { response, errResponse } from '../../config/response.js';
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
    res.send(response(successStatus.GET_ALL_POSTS_SUCCESS, posts));
  } catch (err) {
    res.send(errResponse(errStatus.POST_NOT_FOUND));
  }
};

const getPost = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const post = await getPostLogic(post_id);
    res.send(response(successStatus.GET_ONE_POST_SUCCESS, post));
  } catch (err) {
    res.send(errResponse(errStatus.POST_NOT_FOUND));
  }
};

const createPost = async (req, res) => {
  try {
    const { user_id } = req.params;
    const post = await createPostLogic(req.body, user_id);
    res.send(response(successStatus.MAKE_POST_SUCCESS, post));
  } catch (err) {
    res.send(errResponse(errStatus.POST_CREATION_FAILED));
  }
};

const updatePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const updatedPost = await updatePostLogic(req.body, post_id);
    res.send(response(successStatus.UPDATE_POST_SUCCESS, updatedPost));
  } catch (err) {
    res.send(errResponse(errStatus.POST_UPDATE_FAILED));
  }
};

const deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    await deletePostLogic(post_id);
    res.send(response(successStatus.DELETE_POST_SUCCESS));
  } catch (err) {
    res.send(errResponse(errStatus.POST_DELETE_FAILED));
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
