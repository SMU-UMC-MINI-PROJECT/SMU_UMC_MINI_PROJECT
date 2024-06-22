import { uploadImage } from '../middleware/image.uploader.js';

export const postImage = [
  uploadImage.single('image'),
  (req, res) => {
    try {
      // 업로드가 성공적으로 완료된 경우
      const file = req.file;
      res.status(200).json({
        message: 'File uploaded successfully',
        fileInfo: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: file.location, // S3에 업로드된 파일의 URL
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'File upload failed',
        error: errStatus.METHOD_NOT_ALLOWED,
      });
    }
  },
];
