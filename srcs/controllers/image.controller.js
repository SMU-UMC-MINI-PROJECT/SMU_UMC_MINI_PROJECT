import { uploadImage } from '../middleware/image.uploader.js';
import { errStatus } from '../../config/errorStatus.js';
const createImage = [
  uploadImage.single('image'),
  (req, res) => {
    try {
      // 업로드가 성공적으로 완료된 경우
      const { post_id } = req.params;
      const file = req.file;
      res.status(200).json({
        message: 'File uploaded successfully',
        fileInfo: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: file.location, // S3에 업로드된 파일의 URL
          id: post_id,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: 'File upload failed',
        error: errStatus.METHOD_NOT_ALLOWED,
      });
    }
  },
];

const getImage = async (req, res) => {
  try {
    const { post_id } = req.params;
    const imageUrl = `https://umc-miniproject-s3.s3.ap-northeast-2.amazonaws.com/posts/${post_id}`;
    res.status(200).json(imageUrl);
  } catch (err) {
    res.status(500).json({
      message: errStatus.BAD_REQUEST.message,
      error: errStatus.BAD_REQUEST,
    });
  }
};

export { createImage, getImage };
