import express from 'express';
import { login } from '../controllers/loginController.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/', asyncHandler(login));

export { router as loginRouter };
