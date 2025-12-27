import swaggerJSDoc from 'swagger-jsdoc';
import env from './env.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Tracker API',
            version: '1.0.0',
            description: 'REST API for tracking job applications, interviews, and analytics',
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: 'Development server',
            },
            {
                url: `https://${env.API_KEY}`, // Production
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
