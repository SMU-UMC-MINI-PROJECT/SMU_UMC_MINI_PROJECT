//testRoute.js
import { test } from '../controllers/testController.js';
import express from 'express';

export const testRouter = express.Router();

testRouter.get('/test', test);