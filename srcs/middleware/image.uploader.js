import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import dotenv from 'dotenv';
import { createUUID } from './uuid.js';
import { errStatus } from '../../config/errorStatus.js';
import { BaseError } from '../../config/baseError.js';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

export const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const uploadDirectory = 'posts'; // 모든 파일이 'posts' 디렉토리에 저장됨
      const extension = path.extname(file.originalname);
      const uuid = createUUID();
      if (!allowedExtensions.includes(extension)) {
        return callback(new BaseError(errStatus.WRONG_EXTENSION));
      }
      callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`);
    },
    acl: 'public-read-write',
  }),
});
