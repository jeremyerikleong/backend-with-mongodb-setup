import express from 'express';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

export default app;