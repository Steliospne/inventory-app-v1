import { query } from 'express';
import pool from './pool.js';

export const createNewProduct = async (product) => {
  const query = `
    INSERT INTO products
    (name, category_id, current_stock, selling_price)
    VALUES ($1, (SELECT id FROM product_categories WHERE name = $2), $3, $4);
  `;

  const values = [
    product.product,
    product.category,
    product.stock,
    product.price,
  ];

  await pool.query(query, values);
};

export const getProducts = async () => {
  const query = `
    SELECT
      p.id AS id, 
      p.name AS product,
      p.selling_price AS price,
      p.current_stock AS stock, 
      pc.name AS category
    FROM 
      products p
    JOIN 
      product_categories pc ON p.category_id = pc.id
    ORDER BY 
      pc.name, p.name;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

export const getProduct = async (id) => {
  const query = `
    SELECT
      p.id AS id, 
      p.name AS product,
      p.selling_price AS price,
      p.current_stock AS stock, 
      pc.name AS category
    FROM 
      products p
    JOIN 
      product_categories pc ON p.category_id = pc.id
    WHERE 
      p.id = $1 
    ORDER BY 
      pc.name, p.name;
  `;
  const values = [id];

  const { rows } = await pool.query(query, values);

  return rows;
};

export const deleteProduct = async (id) => {
  const query = `
    DELETE FROM products
    WHERE id = $1;

  `;

  const values = [id];

  await pool.query(query, values);
};

export const updateProduct = async (id, product) => {
  const query = `
    UPDATE products
    SET 
      name = $1,
      category_id = (SELECT id FROM product_categories WHERE name = $2),
      current_stock = $3,
      selling_price = $4
    WHERE 
      id = $5;
  `;

  const values = [
    product.product,
    product.category,
    product.stock,
    product.price,
    id,
  ];

  return await pool.query(query, values);
};

export const createNewCategory = async (category) => {
  const query = `
    INSERT INTO product_categories (name)
    VALUES ($1);
  `;

  const values = [category];

  await pool.query(query, values);
};

export const getCategories = async () => {
  const query = `
    SELECT name, id FROM product_categories;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

export const updateCategory = async (id, product) => {
  const query = `
    UPDATE product_categories
    SET 
      name = $2
    WHERE 
      id = $1;
  `;

  const values = [id, product];

  return await pool.query(query, values);
};

export const deleteCategory = async (id) => {
  const query = `
    DELETE FROM product_categories
    WHERE id = $1;
  `;

  const values = [id];

  await pool.query(query, values);
};

export const getSuppliers = async () => {
  const query = `
  SELECT
  s.id AS id,
  s.name AS supplier,
  s.email AS email,
  s.phone AS phone
  FROM
  suppliers s
  ORDER BY
  s.name;
  `;
  const { rows } = await pool.query(query);

  return rows;
};

export const getSupplier = async (id) => {
  const query = `
  SELECT
  s.id AS id,
  s.name AS supplier,
  s.email AS email,
  s.phone AS phone
  FROM
  suppliers s
  WHERE 
  s.id = $1
  ORDER BY
  s.name;
  `;
  const values = [id];
  const { rows } = await pool.query(query, values);

  return rows;
};

export const createNewSupplier = async (supplier) => {
  const query = `
    INSERT INTO suppliers
    (name, email, phone)
    VALUES ($1, $2, $3);
  `;

  const values = [supplier.supplier, supplier.email, supplier.phone];
  console.log(values);
  await pool.query(query, values);
};

export const updateSupplier = async (id, supplier) => {
  const query = `
    UPDATE suppliers
    SET 
      name = $1,
      email = $2,
      phone = $3
    WHERE 
      id = $4;
  `;

  const values = [supplier.supplier, supplier.email, supplier.phone, id];

  return await pool.query(query, values);
};

export const deleteSupplier = async (id) => {
  const query = `
    DELETE FROM suppliers
    WHERE id = $1;

  `;

  const values = [id];

  await pool.query(query, values);
};

export const getInventoryMovements = async () => {
  const query = `
  WITH monthly_transactions AS (
    SELECT 
      DATE_TRUNC('month', transaction_date) as month,
      transaction_type,
    CASE 
      WHEN transaction_type = 'used' THEN SUM(quantity * COALESCE(unit_price, 0)) * -1
      ELSE SUM(quantity * COALESCE(unit_price, 0))
      END as total_value
    FROM inventory_transactions
    WHERE unit_price IS NOT NULL
    GROUP BY 1, 2
  )
  SELECT 
    month,
    MAX(CASE WHEN transaction_type = 'received' THEN total_value ELSE 0 END) as purchase,
    ABS(MAX(CASE WHEN transaction_type = 'used' THEN total_value ELSE 0 END)) as usage
  FROM monthly_transactions
  GROUP BY month
  ORDER BY month;
  `;

  const { rows } = await pool.query(query);
  return rows;
};

export const getTurnOverRate = async () => {
  const query = `
  WITH monthly_movements AS (
    SELECT 
        DATE_TRUNC('month', transaction_date) as month,
        ingredient_id,
        SUM(CASE WHEN transaction_type = 'received' THEN quantity
             ELSE 0 END) as purchased,
        SUM(CASE WHEN transaction_type = 'used' THEN quantity
             ELSE 0 END) as used
    FROM inventory_transactions
    GROUP BY 1, 2
  )
  SELECT 
      month,
      ROUND(SUM(used) / NULLIF(SUM(purchased), 0) * 100, 2) as turnover_rate
  FROM monthly_movements
  GROUP BY month
  ORDER BY month;
  `;
  const { rows } = await pool.query(query);
  return rows;
};
