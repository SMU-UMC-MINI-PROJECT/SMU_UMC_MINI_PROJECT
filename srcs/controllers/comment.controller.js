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
    const { post_id } = req.params;
    const comments = await getCommentsLogic(post_id);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const createComment = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { text, parentComment } = req.body;
    const comment = await createCommentLogic(post_id, text, parentComment);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const updateComment = async (req, res) => {
  const { post_id, comment_id } = req.params;
  const { text } = req.body;
  try {
    const updatedComment = await updateCommentLogic(post_id, comment_id, text);
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { post_id, comment_id } = req.params;
    await deleteCommentLogic(post_id, comment_id);
    res.status(200).json({ message: successStatus.ISSUCCESS });
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

export { getComments, createComment, updateComment, deleteComment };
