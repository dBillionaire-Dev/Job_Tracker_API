import express from 'express';
import env from './config/env.js';
import ConnectToDB from "./config/db.js";
import UserRoutes from "./routes/userRoute.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger.js";
import './jobs/followUpJob.js';
import cors from 'cors';

ConnectToDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', UserRoutes);

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(env.PORT, () => {
    console.log(`Server is listening on port ${env.PORT}, which is in running on http://localhost:${env.PORT}`);
})