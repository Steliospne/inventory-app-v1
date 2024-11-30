import Router from 'express';
import {
  getProduct,
  getProducts,
  getCategories,
  getSupplier,
  getSuppliers,
  updateProduct,
  updateSupplier,
  createNewProduct,
  createNewSupplier,
  deleteProduct,
  deleteSupplier,
  createNewCategory,
  deleteCategory,
  updateCategory,
} from '../db/queries.js';
import { ProductSchema } from '../lib/definitions.js';
import { getErrorMessages } from '../lib/lib.js';

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

apiRouter.post('/api/newProduct', async (req, res) => {
  const { product } = req.body;
  const categories = await getCategories();
  const validatedFields = ProductSchema.safeParse({
    product: product.product,
    category: product.category,
    stock: product.stock,
    price: product.price,
  });

  if (!validatedFields.success) {
    const errors = validatedFields?.error?.errors;
    console.log(product);
    return res.send(getErrorMessages(errors));
  }
  const found = categories.find(
    (category) => category.name.toLowerCase() == product.category.toLowerCase(),
  );

  if (found) {
    await createNewProduct(product);
  } else {
    await createNewCategory(product.category);
    await createNewProduct(product);
  }
  res.send();
});

apiRouter.put('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { product } = req.body;
  const categories = await getCategories();
  const found = categories.find(
    (category) => category.name.toLowerCase() == product.category.toLowerCase(),
  );

  if (found) {
    await updateProduct(productId, product);
  } else {
    await createNewCategory(product.category);
    await updateProduct(productId, product);
  }

  res.send();
});

apiRouter.post('/api/newCategory', async (req, res) => {
  const { category } = req.body;
  await createNewCategory(category);
  console.log(category);
  res.send();
});

apiRouter.put('/api/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { category } = req.body;

  await updateCategory(categoryId, category);

  res.send();
});

apiRouter.delete('/api/delete/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  await deleteCategory(categoryId);
  res.send();
});

apiRouter.delete('/api/delete/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  await deleteProduct(productId);
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
apiRouter.get('/api/suppliers/:supplierId', async (req, res) => {
  const supplierId = req.params.supplierId;
  const [suppliers] = await getSupplier(supplierId);
  res.send(suppliers);
});

apiRouter.post('/api/newSupplier', async (req, res) => {
  const { supplier } = req.body;
  await createNewSupplier(supplier);
  console.log(supplier);
  res.send();
});

apiRouter.put('/api/suppliers/:supplierId', async (req, res) => {
  const supplierId = req.params.supplierId;
  const { supplier } = req.body;
  await updateSupplier(supplierId, supplier);

  res.send();
});

apiRouter.delete('/api/delete/suppliers/:supplierId', async (req, res) => {
  const supplierId = req.params.supplierId;
  await deleteSupplier(supplierId);
  res.send();
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
