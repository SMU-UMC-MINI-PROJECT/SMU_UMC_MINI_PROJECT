import express from 'express';
import { jwtMiddleware } from '../../config/jwt.js';

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:post_id')
  .get(jwtMiddleware, getComments)
  .post(jwtMiddleware, createComment);

commentRouter
  .route('/:post_id/:comment_id')
  .patch(jwtMiddleware, updateComment)
  .delete(jwtMiddleware, deleteComment);
