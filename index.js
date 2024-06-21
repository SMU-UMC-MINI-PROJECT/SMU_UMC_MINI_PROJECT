//index.js

import express from 'express';
import { errStatus } from './config/errorStatus.js';
import { response } from './config/response.js';
import { specs } from './config/swagger.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';
import { postRouter } from './srcs/routes/post.route.js';
import { commentRouter } from './srcs/routes/comment.route.js';
import { uploadImage } from './srcs/middleware/image.uploader.js';

const app = express();
const port = 3000;

app.set('port', process.env.PORT || 3000); // 서버 포트 지정
app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
dotenv.config(); // .env 파일 사용 (환경 변수 관리)

// swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// routes
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// image upload
app.post('/upload', uploadImage.single('image'), (req, res) => {
  try {
    // 업로드가 성공적으로 완료된 경우
    const file = req.file;
    res.status(200).json({
      message: 'File uploaded successfully',
      fileInfo: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: file.location, // S3에 업로드된 파일의 URL
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'File upload failed',
      error: errStatus.METHOD_NOT_ALLOWED,
    });
  }
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res
    .status(errStatus.INTERNAL_SERVER_ERROR || err.data.status)
    .send(response(err.data));
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};

connectDB();
