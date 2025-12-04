import express from 'express'
import { config } from 'dotenv'
import routes from '../src/routers/index'
import cors from "cors";

config()
const app = express()

app.use(cors());
app.use(express.json())
app.use(routes)

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
export default app