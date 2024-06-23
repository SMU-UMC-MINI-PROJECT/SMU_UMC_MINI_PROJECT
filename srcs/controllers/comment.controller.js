import { successStatus } from '../../config/successStatus.js';
import { errStatus } from '../../config/errorStatus.js';
import { response } from '../../config/response.js';
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
    res.send(response(successStatus.GET_COMMENTS_SUCCESS, comments));
  } catch (err) {
    res.send(response(errStatus.BAD_REQUEST));
  }
};

const createComment = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { user_id } = req.verifiedToken;
    const { text, parentComment } = req.body;

    const comment = await createCommentLogic(
      post_id,
      user_id,
      text,
      parentComment
    );

    res.send(response(successStatus.MAKE_COMMENT_SUCCESS, comment));
  } catch (err) {
    res.send(response(errStatus.COMMENT_CREATION_FAILED));
  }
};

const updateComment = async (req, res) => {
  try {
    const { post_id, comment_id } = req.params;
    const { text } = req.body;

    const updatedComment = await updateCommentLogic(post_id, comment_id, text);
    res.send(response(successStatus.UPDATE_COMMENT_SUCCESS, updatedComment));
  } catch (err) {
    res.send(response(errStatus.COMMENT_UPDATE_FAILED));
  }
};

const deleteComment = async (req, res) => {
  try {
    const { post_id, comment_id } = req.params;
    await deleteCommentLogic(post_id, comment_id);
    res.send(reponse(successStatus.DELETE_COMMENT_SUCCESS));
  } catch (err) {
    res.send(reponse(errStatus.COMMENT_DELETE_FAILED));
  }
};

export { getComments, createComment, updateComment, deleteComment };
