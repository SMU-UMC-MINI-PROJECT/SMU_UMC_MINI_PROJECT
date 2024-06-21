import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

export const postRouter = express.Router();

postRouter.get('', getPosts);

postRouter.get('/:id', getPost);

postRouter.post('', createPost);

postRouter.patch('/:id', updatePost);

postRouter.delete('/:id', deletePost);
