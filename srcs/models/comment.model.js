const CommentSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // 대댓글
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
    text: { type: String, required: [true, '댓글을 작성해주세요'] },
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);
// 가상 필드는 실제 db에 저장 안된다. 관계형 데이터 처리할 때 유용함
CommentSchema.virtual('childComments')
  .get(function () {
    return this._childComments;
  })
  .set(function (value) {
    this._childComments = value;
  });

module.exports = mongoose.model('Comment', CommentSchema);
