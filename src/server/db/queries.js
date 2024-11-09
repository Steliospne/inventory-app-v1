import pool from './pool.js';

export const getProducts = async () => {
  const query = `
    SELECT 
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
