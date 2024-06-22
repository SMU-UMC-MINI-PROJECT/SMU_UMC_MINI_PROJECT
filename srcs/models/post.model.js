import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '제목을 작성해주세요'],
    },
    content: {
      type: String,
      required: [true, '내용을 작성해주세요'],
    },
    // announce: {
    //   type: Boolean,
    //   required: [true, '공지 유무를 작성해주세요'],
    // },
  },
  {
    timestamps: true,
  }
);

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

export default mongoose.model('Post', PostSchema);
