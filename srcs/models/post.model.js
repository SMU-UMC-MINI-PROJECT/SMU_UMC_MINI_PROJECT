import mongoose from 'mongoose';
import CommentSchema from './comment.model';

const PostSchema = mongoose.Schema(
  {
    // 유저 나중에 연결해줄 것
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'user',
    //   require: true,
    // },

    title: {
      type: String,
      required: [true, '제목을 작성해주세요'],
    },
    content: {
      type: String,
      required: [true, '내용을 작성해주세요'],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

export default mongoose.model('Post', PostSchema);
