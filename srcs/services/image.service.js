import Image from '../models/comment.model.js';
const uploadImageLogic = async (file) => {
  try {
    const newImage = new Image({
      image: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
    await newImage.save();
    return newImage;
  } catch (err) {
    throw new Error('이미지 업로드 중 오류 발생!');
  }
};

export { uploadImageLogic };
