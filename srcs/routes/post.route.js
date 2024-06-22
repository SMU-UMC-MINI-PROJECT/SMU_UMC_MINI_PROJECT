import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

export const postRouter = express.Router();

postRouter.route('').get(getPosts).post(createPost);

postRouter.route('/:id').get(getPost).patch(updatePost).delete(deletePost);
