import Router from 'express';
import {
  getDailyStockMovement,
  getInventoryMovements,
  getTopMovingIngredients,
  getTurnOverRate,
} from '../db/queries.js';
export const dashBoardRouter = Router();

dashBoardRouter.get('/get/inventory-movement', async (req, res, next) => {
  const response = await getInventoryMovements();
  res.send(response);
});

dashBoardRouter.get('/get/turn-over-rate', async (req, res, next) => {
  const response = await getTurnOverRate();
  res.send(response);
});

dashBoardRouter.get('/get/top-moving-ingredients', async (req, res, next) => {
  const response = await getTopMovingIngredients();
  res.send(response);
});

dashBoardRouter.get('/get/daily-movements', async (req, res, next) => {
  const response = await getDailyStockMovement();
  res.send(response);
});
