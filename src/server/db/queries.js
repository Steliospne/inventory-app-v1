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
  await pool.query(query, values);
};

export const getSuppliers = async () =>{
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
  `
  const { rows } = await pool.query(query);

  return rows;
}