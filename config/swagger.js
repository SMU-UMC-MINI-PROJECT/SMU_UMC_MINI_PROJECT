//swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    info: {
      title: 'UMC_MINI_PROJECT_API',
      version: '1.0.0',
      description: 'UMC_MINI_PROJECT_API, API 설명',
    },
    server: {
      url: 'http://localhost:3000',
    },
  },
  apis: ['./config/swagger.js', './srcs/routes/*.js', './config/swagger/*'],
};

const specs = swaggerJSDoc(options);

export { specs };
