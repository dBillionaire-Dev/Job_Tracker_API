import express from 'express';
import env from './config/env.js';
import ConnectToDB from "./config/db.js";
import UserRoutes from "./routes/userRoute.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import './jobs/followUpJob.js';


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Tracker API',
            version: '1.0.0',
            description: 'API for tracking job applications, networking, and career analytics',
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`, // Development
            },
            {
                url: `https://${env.API_KEY}`, // Production
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

ConnectToDB();

const app = express();

app.use(express.json());
app.use('/auth', UserRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(env.PORT, () => {
    console.log(`Server is listening on port ${env.PORT}, which is in running on http://localhost:${env.PORT}`);
})