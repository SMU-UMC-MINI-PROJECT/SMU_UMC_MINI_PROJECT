import express from 'express';
import { uploadImage } from '../controllers/image.controller.js';
import { imageUploader } from '../middleware/image.uploader.js';

export const imageRouter = express.Router();

// image는 이미지 파일의 key값
imageRouter.post('', imageUploader.single('image'), uploadImage);
