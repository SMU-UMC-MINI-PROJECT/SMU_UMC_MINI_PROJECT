// routes/withdrawRouter.js

import express from 'express';
import { withdraw } from '../controllers/withdrawController.js'; // 다음에 생성할 컨트롤러

const router = express.Router();

router.post('/', withdraw);

export { router as withdrawRouter };
