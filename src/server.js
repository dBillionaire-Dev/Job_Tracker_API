import express from 'express'
import env from './config/env.js'
import ConnectToDB from "./config/db.js";

ConnectToDB();

const app = express();

app.use(express.json());

app.listen(env.PORT, () => {
    console.log(`Server is listening on port ${env.PORT}, which is in running on http://localhost:${env.PORT}`);
})