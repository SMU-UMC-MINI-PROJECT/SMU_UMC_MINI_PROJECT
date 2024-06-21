import mongoose from 'mongoose';

const ImageSchema = mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model('Image', ImageSchema);
