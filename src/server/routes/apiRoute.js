import Router from 'express';
import { getProducts, getCategories, updateProducts } from '../db/queries.js';

export const apiRouter = Router();

apiRouter.get('/api/products', async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

apiRouter.post('/api/products', async (req, res) => {
  const { products } = req.body;
  await updateProducts(products);
  res.send();
});

apiRouter.get('/api/categories', async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

apiRouter.get('/api/*', (req, res) => {
  // Define valid routes
  const validRoutes = ['/api/products', '/api/categories'];

  // Check if the requested path matches any valid route
  if (!validRoutes.includes(req.path)) {
    return res.status(404).json({
      error: 'Route not found',
      requestedPath: req.path,
    });
  }
});

apiRouter.use((err, req, res, next) => {
  console.error('Error:', err.message);
  next();
  res.status(500);
});
