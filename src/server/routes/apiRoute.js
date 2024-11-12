import Router from 'express';
import {
  getProduct,
  getProducts,
  getCategories,
  getSuppliers,
  updateProduct,
} from '../db/queries.js';

export const apiRouter = Router();

apiRouter.get('/api/products', async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

apiRouter.get('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  const [products] = await getProduct(productId);
  res.send(products);
});

apiRouter.put('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { product } = req.body;
  await updateProduct(productId, product);
  res.send();
});

apiRouter.get('/api/categories', async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

apiRouter.get('/api/suppliers', async (req, res) => {
  const suppliers = await getSuppliers();
  res.send(suppliers);
});

apiRouter.get('/api/*', (req, res) => {
  // Define valid routes
  const validRoutes = ['/api/products', '/api/categories', '/api/suppliers'];

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
