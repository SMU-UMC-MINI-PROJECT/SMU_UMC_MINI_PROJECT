//index.js

import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';

import { errStatus } from './config/errorStatus.js';
import { response } from './config/response.js';
import { specs } from './config/swagger.js';
import { postRouter } from './srcs/routes/post.route.js';
import { commentRouter } from './srcs/routes/comment.route.js';
import { imageRouter } from './srcs/routes/image.route.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { default as setupSocketIO } from './utils/io.js';
import { loginRouter } from './srcs/routes/loginRouter.js';
import { signupRouter } from './srcs/routes/signupRouter.js';
import { jwtMiddleware } from './config/jwt.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port); // 서버 포트 지정
const corsOptions = {
  origin: '*', // 모든 출처 허용
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // CORS 설정
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
dotenv.config(); // .env 파일 사용 (환경 변수 관리)

// swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


// routes
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/image', imageRouter);

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

// HTTP 서버 및 Socket.IO 서버 생성
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
  path: '/socket'
});

setupSocketIO(io);

// 서버 시작
httpServer.listen(5001, () => {
  console.log('Server is running on port 5001');
});
