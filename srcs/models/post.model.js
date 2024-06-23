import mongoose, { Schema } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

const PostSchema = new Schema(
  {
    writer: {
      type: ObjectId,
      required: true,
      ref: 'Student',
    },
    title: {
      type: String,
      required: [true, '제목을 작성해주세요'],
    },
    content: {
      type: String,
      required: [true, '내용을 작성해주세요'],
    },
    announce: {
      type: Boolean,
      default: false,
    },
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
  foreignField: 'post_id',
});

export default mongoose.model('Post', PostSchema);
