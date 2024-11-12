import pool from './pool.js';

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

export const getCategories = async () => {
  const query = `
    SELECT name, id FROM product_categories;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

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
