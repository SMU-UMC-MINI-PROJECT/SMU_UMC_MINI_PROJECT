import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
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

export default mongoose.model('Post', PostSchema);
