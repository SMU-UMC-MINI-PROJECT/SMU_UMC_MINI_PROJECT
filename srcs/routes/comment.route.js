import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';

export const commentRouter = express.Router();

commentRouter.get('/get/:post_id/comment', getComments);

commentRouter.post('/create/{post_id}/comment', createComment);

commentRouter.patch('patch/{post_id}/comment/{comment_id}', updateComment);

commentRouter.delete('delete/{post_id}/comment/{comment_id}', deleteComment);
