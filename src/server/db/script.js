#! /usr/bin/env node

class InventoryTransactionGenerator {
  constructor() {
    // Supplier-ingredient mappings with typical quantities and prices
    this.suppliersIngredients = [
      {
        supplier: 'De Molen Flours BV',
        ingredient: 'All-Purpose Flour',
        unit: 'kg',
        unitPrice: 1.25,
        typicalQty: 25,
      },
      {
        supplier: 'De Molen Flours BV',
        ingredient: 'Whole Wheat Flour',
        unit: 'kg',
        unitPrice: 1.45,
        typicalQty: 25,
      },
      {
        supplier: 'Berger Butter GmbH',
        ingredient: 'European Butter',
        unit: 'kg',
        unitPrice: 8.9,
        typicalQty: 10,
      },
      {
        supplier: 'La Farine Excellence SARL',
        ingredient: 'Pastry Flour',
        unit: 'kg',
        unitPrice: 1.65,
        typicalQty: 20,
      },
      {
        supplier: 'Dolce Vita Ingredients SRL',
        ingredient: 'Vanilla Extract',
        unit: 'liters',
        unitPrice: 45.0,
        typicalQty: 1,
      },
      {
        supplier: 'Nordic Berry Farms AB',
        ingredient: 'Fresh Berries Mix',
        unit: 'kg',
        unitPrice: 12.5,
        typicalQty: 5,
      },
      {
        supplier: 'Belgian Chocolate Works SA',
        ingredient: 'Dark Chocolate',
        unit: 'kg',
        unitPrice: 8.39,
        typicalQty: 10,
      },
      {
        supplier: 'Belgian Chocolate Works SA',
        ingredient: 'Milk Chocolate',
        unit: 'kg',
        unitPrice: 7.89,
        typicalQty: 10,
      },
      {
        supplier: 'Spanish Nuts & Almonds SL',
        ingredient: 'Almonds',
        unit: 'kg',
        unitPrice: 11.35,
        typicalQty: 5,
      },
      {
        supplier: 'Spanish Nuts & Almonds SL',
        ingredient: 'Hazelnuts',
        unit: 'kg',
        unitPrice: 12.45,
        typicalQty: 5,
      },
      {
        supplier: 'Danish Dairy Supplies A/S',
        ingredient: 'Heavy Cream',
        unit: 'liters',
        unitPrice: 3.75,
        typicalQty: 10,
      },
    ];

    this.transactionTypes = ['received', 'used', 'adjusted'];
  }

  // Generate random number between min and max
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Generate random date within last 6 months
  randomDate() {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 6);

    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  // Calculate quantity based on transaction type
  calculateQuantity(transactionType, typicalQty) {
    switch (transactionType) {
      case 'received':
        return this.random(0.8, 1.2) * typicalQty;
      case 'used':
        return -1 * this.random(0.3, 0.6) * typicalQty;
      case 'adjusted':
        return this.random(-0.1, 0.1) * typicalQty;
      default:
        return 0;
    }
  }

  // Generate a single transaction
  generateTransaction() {
    const ingredient =
      this.suppliersIngredients[
        Math.floor(Math.random() * this.suppliersIngredients.length)
      ];
    const transactionType =
      this.transactionTypes[
        Math.floor(Math.random() * this.transactionTypes.length)
      ];

    const quantity = this.calculateQuantity(
      transactionType,
      ingredient.typicalQty,
    );
    const unitPrice =
      transactionType === 'received'
        ? ingredient.unitPrice * this.random(0.95, 1.05)
        : ingredient.unitPrice;

    return {
      ingredient: ingredient.ingredient,
      supplier: ingredient.supplier,
      transaction_type: transactionType,
      quantity: Number(quantity.toFixed(2)),
      unit_price: Number(unitPrice.toFixed(2)),
      unit: ingredient.unit,
      transaction_date: this.randomDate(),
      notes: this.generateNotes(transactionType, ingredient.supplier),
    };
  }

  // Generate notes based on transaction type
  generateNotes(transactionType, supplier) {
    switch (transactionType) {
      case 'received':
        return `Regular delivery from ${supplier}`;
      case 'used':
        return 'Daily production usage';
      case 'adjusted':
        return 'Inventory adjustment after daily count';
      default:
        return '';
    }
  }

  // Generate multiple transactions
  generateTransactions(count = 100) {
    const transactions = [];

    for (let i = 0; i < count; i++) {
      transactions.push(this.generateTransaction());
    }

    // Sort by date
    return transactions.sort((a, b) => a.transaction_date - b.transaction_date);
  }

  // Generate summary report
  generateSummaryReport(transactions) {
    const summary = {};

    transactions.forEach((transaction) => {
      const month = transaction.transaction_date.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      if (!summary[month]) {
        summary[month] = {
          total_transactions: 0,
          unique_ingredients: new Set(),
          total_received: 0,
          total_used: 0,
          total_adjusted: 0,
        };
      }

      summary[month].total_transactions++;
      summary[month].unique_ingredients.add(transaction.ingredient);

      switch (transaction.transaction_type) {
        case 'received':
          summary[month].total_received += transaction.quantity;
          break;
        case 'used':
          summary[month].total_used += transaction.quantity;
          break;
        case 'adjusted':
          summary[month].total_adjusted += transaction.quantity;
          break;
      }
    });

    // Convert Sets to counts and round numbers
    Object.keys(summary).forEach((month) => {
      summary[month].unique_ingredients =
        summary[month].unique_ingredients.size;
      summary[month].total_received = Number(
        summary[month].total_received.toFixed(2),
      );
      summary[month].total_used = Number(summary[month].total_used.toFixed(2));
      summary[month].total_adjusted = Number(
        summary[month].total_adjusted.toFixed(2),
      );
    });

    return summary;
  }
}

import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const USER = process.env.DATABASE_USER_LOCAL;
const SECRET = process.env.DATABASE_SECRET_LOCAL;
const HOST = process.env.DATABASE_HOST_LOCAL;
const NAME = process.env.DATABASE_NAME_LOCAL;

const pool = new Pool({
  connectionString: `postgresql://${USER}:${SECRET}@${HOST}/${NAME}`,
});

const generator = new InventoryTransactionGenerator();

const fakeTransactions = async () => {
  const transactions = generator.generateTransactions(100);

  for (const transaction of transactions) {
    await pool.query(
      `INSERT INTO inventory_transactions 
       (ingredient_id, transaction_type, quantity, unit_price, transaction_date, notes)
       VALUES 
       ((SELECT id FROM ingredients WHERE name = $1), $2, $3, $4, $5, $6)`,
      [
        transaction.ingredient,
        transaction.transaction_type,
        transaction.quantity,
        transaction.unit_price,
        transaction.transaction_date,
        transaction.notes,
      ],
    );
  }
};

fakeTransactions();
