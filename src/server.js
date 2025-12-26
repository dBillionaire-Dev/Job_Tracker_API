import express from 'express'
import dotenv from 'dotenv'
import ConnectToDB from "./config/db.js";

dotenv.config();
ConnectToDB();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}, which is in running on http://localhost:${port}`);
})