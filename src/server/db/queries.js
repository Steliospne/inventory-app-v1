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

export const getCategories = async () => {
  const query = `
    SELECT name, id FROM product_categories;
  `;
  const { rows } = await pool.query(query);

  return rows;
};
export const updateProducts = async (products) => {
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

  products.forEach(async (product) => {
    const values = [
      product.product,
      product.category,
      product.stock,
      product.price,
      product.id,
    ];
    await pool.query(query, values);
    console.log(values);
  });
};
