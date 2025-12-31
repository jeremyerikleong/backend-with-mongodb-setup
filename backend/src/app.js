import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/users', userRouter);

export default app;