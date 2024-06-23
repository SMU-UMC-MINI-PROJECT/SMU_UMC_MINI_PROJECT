import express from 'express';
import { signup } from '../controllers/signupController.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/', asyncHandler(signup));

export { router as signupRouter };
