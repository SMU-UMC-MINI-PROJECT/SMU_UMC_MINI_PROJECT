import express from 'express';
import { createImage, getImage } from '../controllers/image.controller.js';

export const imageRouter = express.Router();

imageRouter.route('/:post_id').get(getImage).post(createImage);
