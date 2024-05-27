//swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
export const options = {
    swaggerDefinition: {
        info: {
            title: 'UMC Node study',
            version: '1.0.0',
            description: "API"
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ]
    },
    apis: ['./config/swagger.js', './srcs/routes/*.js', './config/swagger/*']
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };