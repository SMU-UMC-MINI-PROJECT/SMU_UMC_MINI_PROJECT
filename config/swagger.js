import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// __dirname을 ES 모듈에서 사용하기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// YAML 파일을 읽고 파싱
const yamlPath = path.resolve(__dirname, '../swagger.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');
const yamlOptions = yaml.load(yamlContent);

const options = {
  definition: {
    openapi: yamlOptions.openapi || '3.0.0',
    info: {
      title: yamlOptions.info.title || 'UMC_MINI_PROJECT_API',
      version: yamlOptions.info.version || '1.0.0',
      description: yamlOptions.info.description || 'UMC_MINI_PROJECT_API, API 설명',
    },
    host: process.env.EC2 || 'localhost:3000',
    basePath: yamlOptions.basePath || '/',
    schemes: yamlOptions.schemes || ['http'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    ...yamlOptions,
  },
  apis: ['./srcs/routes/*.js', './utils/io.js', './config/swagger.js', './config/swagger/*'],
};

const specs = swaggerJsdoc(options);

export { specs };
