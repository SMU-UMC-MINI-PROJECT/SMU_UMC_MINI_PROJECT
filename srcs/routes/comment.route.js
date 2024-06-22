import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';

export const commentRouter = express.Router();

commentRouter.route('/:post_id').get(getComments).post(createComment);

commentRouter
  .route('/:post_id/:comment_id')
  .get(updateComment)
  .delete(deleteComment);
