import express from 'express';
import { jwtMiddleware } from '../../config/jwt.js';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

export const postRouter = express.Router();

postRouter
  .route('/')
  .post(jwtMiddleware, createPost)
  .get(jwtMiddleware, getPosts);

postRouter
  .route('/:post_id')
  .get(jwtMiddleware, getPost)
  .patch(jwtMiddleware, updatePost)
  .delete(jwtMiddleware, deletePost);
