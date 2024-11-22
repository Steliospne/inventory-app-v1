import Router from 'express';
import { getInventoryMovements } from '../db/queries.js';
export const dashBoardRouter = Router();

dashBoardRouter.get('/get/inventory-movement', async (req, res, next) => {
  const response = await getInventoryMovements();
  // console.log(response);
  res.send(response);
});
