import 'dotenv/config';
import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';
import { userRouter } from './routes/userRouter.js';
import { apiRouter } from './routes/apiRoute.js';

const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRouter);
app.use('/', apiRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  next();
  res.status(500);
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port ${PORT}...`),
);
