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
    depth: {
      type: Number,
      default: 1,
    },
    text: { type: String, required: [true, '댓글을 작성해주세요'] },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
// 가상 필드는 실제 db에 저장 안된다. 관계형 데이터 처리할 때 유용함

CommentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
  justOne: false, // 여러 개의 댓글을 가져오기 위해 false로 설정
});

// this binding 때문에 화살표 함수로 하면 안됨
CommentSchema.virtual('childComments')
  .get(function () {
    return this._childComments;
  })
  .set(function (value) {
    this._childComments = value;
  });

module.exports = mongoose.model('Comment', CommentSchema);
