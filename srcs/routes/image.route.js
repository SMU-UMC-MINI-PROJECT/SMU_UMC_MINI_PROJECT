import express from 'express';
import { createImage, getImage } from '../controllers/image.controller.js';

export const imageRouter = express.Router();

imageRouter.post('/:post_id', createImage);
imageRouter.get('/:post_id', getImage);
