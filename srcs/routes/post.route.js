import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

export const postRouter = express.Router();

postRouter.get('/get', getPosts);

postRouter.get('/get/:id', getPost);

postRouter.post('/create', createPost);

postRouter.patch('/patch/:id', updatePost);

postRouter.delete('/delete/:id', deletePost);
