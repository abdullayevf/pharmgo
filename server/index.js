import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import dotenv from "dotenv";

const app = express()
dotenv.config();

app.use(cors({ origin: "*" }))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/auth", authRoutes)

export default app;

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})