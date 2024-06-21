import express from 'express';
import { errStatus } from './config/errorStatus.js';
import { response } from './config/response.js';
import { specs } from './config/swagger.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { default as setupSocketIO } from './utils/io.js';

// 미들웨어 및 라우터 가져오기
import cors from 'cors';
import { postRouter } from './srcs/routes/post.route.js';
import { commentRouter } from './srcs/routes/comment.route.js';

// 환경 변수 로드
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 서버 포트 설정
app.set('port', port);

// CORS 설정
app.use(cors());
app.options('*', cors()); // Pre-flight CORS 설정

// 정적 파일 접근
app.use(express.static('public'));

// JSON 파싱 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS 설정
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // 클라이언트의 오리진으로 변경
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Swagger 설정
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// 라우트 정의
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// 에러 핸들링
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(errStatus.INTERNAL_SERVER_ERROR || err.data.status)
    .send(response(err.data));
});

// MongoDB 연결
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');
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
    origin: 'http://localhost:5173', // 클라이언트의 실제 오리진으로 변경
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

setupSocketIO(io);

// 서버 시작
httpServer.listen(5001, () => {
  console.log('Server is running on port 5001');
});
