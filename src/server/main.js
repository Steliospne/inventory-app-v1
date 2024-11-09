import 'dotenv/config';
import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';
import { userRouter } from './routes/userRouter.js';
import { getProducts } from './db/queries.js';

const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRouter);

app.get('/api/products', async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port ${PORT}...`),
);
