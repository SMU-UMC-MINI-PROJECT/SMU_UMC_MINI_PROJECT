import Comment from '../models/comment.model.js';

const getCommentsLogic = async (post_id) => {
  try {
    const comments = await Comment.find({
      post: post_id,
      parentComment: null,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: 'comments',
        match: { isDeleted: false },
        options: { sort: { createdAt: -1 } },
      });
    return comments;
  } catch (err) {
    throw new Error('댓글을 불러오는 중 오류가 발생했습니다.');
  }
};

const createCommentLogic = async (post_id, text, parentComment = null) => {
  console.log(post_id, text, parentComment);
  try {
    let depth = 1;
    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      if (!parent) {
        throw new Error('유효하지 않은 부모 댓글입니다.');
      }
      depth = parent.depth + 1;
    }

    const newComment = new Comment({
      post: post_id,
      text,
      parentComment,
      depth,
    });

    await newComment.save();
    return newComment;
  } catch (err) {
    throw new Error('댓글을 생성하는 중 오류가 발생했습니다.');
  }
};

const updateCommentLogic = async (post_id, comment_Id, newText) => {
  try {
    const comment = await Comment.findOne({ _id: comment_Id, post: post_id });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }
    // 댓글 내용 업데이트
    comment.text = newText;
    await comment.save();
    return comment;
  } catch (err) {
    throw new Error('댓글을 업데이트하는 중 오류가 발생했습니다.');
  }
};

const deleteCommentLogic = async (post_id, comment_id) => {
  try {
    const comment = await Comment.findOne({ _id: comment_id, post: post_id });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    // 논리적 삭제 처리
    comment.isDeleted = true;
    await comment.save();
    return comment;
  } catch (err) {
    throw new Error('댓글을 삭제하는 중 오류가 발생했습니다.');
  }
};

export {
  getCommentsLogic,
  createCommentLogic,
  updateCommentLogic,
  deleteCommentLogic,
};
