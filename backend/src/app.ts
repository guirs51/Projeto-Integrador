import express from 'express'
import { config } from 'dotenv'
import routes from '../src/routers/index'
import cors from "cors";
import path from 'path';

config()
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
export default app