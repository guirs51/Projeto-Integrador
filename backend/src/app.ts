import express from 'express'
import { config } from 'dotenv'
import routes from '../src/routers/index'

config()
const app = express()
app.use(express.json())
app.use(routes)

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
export default app