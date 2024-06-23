import express from 'express';
import { jwtMiddleware } from '../../config/jwt.js';
import { createImage, getImage } from '../controllers/image.controller.js';

export const imageRouter = express.Router();

imageRouter.route('/:post_id').get(jwtMiddleware,getImage).post(jwtMiddleware,createImage);
