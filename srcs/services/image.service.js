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
    console.log('저장된 이미지:', newImage); // 디버깅 로그 추가
    return newImage;
  } catch (err) {
    console.error('이미지 업로드 중 오류 발생:', err); // 에러 로그 추가
    throw new Error('이미지 업로드 중 오류 발생!');
  }
};

export { uploadImageLogic };
