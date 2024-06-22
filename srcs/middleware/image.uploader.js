import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import dotenv from 'dotenv';
import { errStatus } from '../../config/errorStatus.js';
import { BaseError } from '../../config/baseError.js';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const uploadDirectory = 'posts';
      const extension = path.extname(file.originalname);
      const { post_id } = req.params;
      if (!allowedExtensions.includes(extension)) {
        return callback(new BaseError(errStatus.WRONG_EXTENSION));
      }
      callback(null, `${uploadDirectory}/${post_id}`);
    },
    acl: 'public-read-write',
  }),
});

export { uploadImage };
