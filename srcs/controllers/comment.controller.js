import { successStatus } from '../../config/successStatus.js';
import { errStatus } from '../../config/errorStatus.js';
import {
  getCommentsLogic,
  createCommentLogic,
  updateCommentLogic,
  deleteCommentLogic,
} from '../services/comment.service.js';

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getCommentsLogic(postId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, parentComment } = req.body;
    const comment = await createCommentLogic(postId, text, parentComment);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  try {
    const updatedComment = await updateCommentLogic(postId, commentId, text);
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    await deleteCommentLogic(postId, commentId);
    res.status(200).json({ message: successStatus.ISSUCCESS });
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

export { getComments, createComment, updateComment, deleteComment };
