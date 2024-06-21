import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';

export const commentRouter = express.Router();

commentRouter.get('/:post_id', getComments);

commentRouter.post('/:post_id', createComment);

commentRouter.patch('/:post_id/:comment_id', updateComment);

commentRouter.delete('/:post_id/:comment_id', deleteComment);
