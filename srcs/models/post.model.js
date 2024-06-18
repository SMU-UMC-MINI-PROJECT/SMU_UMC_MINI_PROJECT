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
    create_date: {
      type: Date,
      default: new Date(),
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
