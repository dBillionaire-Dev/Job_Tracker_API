import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}, which is in turn running on http://localhost:${port}`);
})