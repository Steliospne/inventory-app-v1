#! /usr/bin/env node
import 'dotenv/config';
import pg from 'pg';
const { Client } = pg;
import bcrypt from 'bcryptjs';

const USER = process.env.DATABASE_USER_LOCAL;
const SECRET = process.env.DATABASE_SECRET_LOCAL;
const HOST = process.env.DATABASE_HOST_LOCAL;
const NAME = process.env.DATABASE_NAME_LOCAL;

// -- User table
const createUserTable = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'employee',  -- 'employee', 'manager', 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// -- Product categories table
const createTableProductCategory = `CREATE TABLE IF NOT EXISTS product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// -- Ingredients table to track raw materials
const createTableIngredients = `CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(20) NOT NULL,  -- e.g., kg, liters, pieces
    unit_price DECIMAL(10,2) NOT NULL,
    current_stock DECIMAL(10,2) NOT NULL,
    minimum_stock DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// -- Products table for finished goods (modified to reference category table)
const createTableProducts = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    selling_price DECIMAL(10,2) NOT NULL,
    current_stock INTEGER NOT NULL,
    category_id INTEGER REFERENCES product_categories(id),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// -- Recipe table to track ingredients needed for each product
const createTableRecipes = `CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity DECIMAL(10,2) NOT NULL,
    UNIQUE(product_id, ingredient_id)
);`;

// -- Inventory transactions to track stock movements
const createTableInventoryTransactions = `CREATE TABLE IF NOT EXISTS inventory_transactions (
    id SERIAL PRIMARY KEY,
    ingredient_id INTEGER REFERENCES ingredients(id),
    transaction_type VARCHAR(20) NOT NULL,  -- 'received', 'used', 'adjusted'
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);`;

// -- Suppliers table
const createTableSuppliers = `CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// -- Purchase orders
const createTablePO = `CREATE TABLE IF NOT EXISTS purchase_orders (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,  -- 'pending', 'received', 'cancelled'
    total_amount DECIMAL(10,2),
    notes TEXT
);`;

// -- Purchase order items
const createTablePOItems = `CREATE TABLE IF NOT EXISTS purchase_order_items (
    id SERIAL PRIMARY KEY,
    purchase_order_id INTEGER REFERENCES purchase_orders(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    UNIQUE(purchase_order_id, ingredient_id)
);`;

// -- Create indexes for better query performance
const createIndexes = `
CREATE INDEX IF NOT EXISTS idx_ingredients_name ON ingredients(name);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_date ON inventory_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_product_categories_name ON product_categories(name);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_first_name ON users(first_name);
CREATE INDEX IF NOT EXISTS idx_users_last_name ON users(last_name);`;

const queries = [
  createUserTable,
  createTableProductCategory,
  createTableIngredients,
  createTableProducts,
  createTableRecipes,
  createTableInventoryTransactions,
  createTableSupplies,
  createTablePO,
  createTablePOItems,
  createIndexes,
];

const populate = async () => {
  console.log('populating...');
  try {
    const client = new Client({
      connectionString: `postgresql://${USER}:${SECRET}@${HOST}/${NAME}`,
    });
    await client.connect();

    const queryPromises = queries.map(async (query) => {
      await client.query(query);
    });

    await Promise.all(queryPromises);

    await client.end();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Creates a new user with an encrypted password
 * @param {Object} user - User object containing registration details
 * @param {string} user.firstname - User's first name
 * @param {string} user.lastname - User's last name
 * @param {string} user.username - User's username
 * @param {string} user.email - User's email address
 * @param {string} user.password - User's plain text password
 * @param {string} [user.role='employee'] - User's role (employee, manager, or admin)
 * @returns {Boolean} True/False
 * @throws {Error} If there's a database error or validation failure
 */
async function createUser(user) {
  // Input validation
  const requiredFields = [
    'firstname',
    'lastname',
    'username',
    'email',
    'password',
  ];
  for (const field of requiredFields) {
    if (!user[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  try {
    const client = new Client({
      connectionString: `postgresql://${USER}:${SECRET}@${HOST}/${NAME}`,
    });
    await client.connect();
    // Generate salt and hash password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // SQL query for user insertion
    const query = `
        INSERT INTO users (
          firstname,
          lastname,
          username,
          email,
          password,
          role
        )
        VALUES ($1, $2, $3, $4, $5, $6);
      `;

    await Promise.all(hashedPassword);

    // Query parameters
    const values = [
      user.firstname,
      user.lastname,
      user.username,
      user.email,
      hashedPassword,
      user.role || 'employee', // Default to 'employee' if role not specified
    ];
    // Execute query
    const result = await client.query(query, values);

    await client.end();
    return true;
  } catch (error) {
    // Handle specific database errors
    if (error.code === '23505') {
      // Unique violation
      if (error.constraint.includes('email')) {
        throw new Error('Email already exists');
      }
      if (error.constraint.includes('username')) {
        throw new Error('Username already exists');
      }
    }

    // Re-throw other errors
    throw error;
  }
}

const user2 = {
  firstname: 'Jerry',
  lastname: 'Pnevmatikakis',
  email: 'jery@domain.com',
  username: 'jery@domain.com',
  password: '1234',
  role: 'admin',
};

const user = {
  firstname: 'Stelios',
  lastname: 'Pnevmatikakis',
  email: 'example@domain.com',
  username: 'example@domain.com',
  password: '1234',
  role: 'admin',
};

createUser(user);

// populate();
