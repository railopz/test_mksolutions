import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infrastructure/http/middlewares/ensureAuthenticated';
import { createSaleMiddleware } from '../middlewares/saleValidate';
import SalesController from '../controllers/SalesController';

const saleRoutes = Router();

const salesController = new SalesController();

saleRoutes.get('/', ensureAuthenticated, salesController.listAll);

saleRoutes.post(
  '/',
  ensureAuthenticated,
  createSaleMiddleware,
  salesController.create,
);

saleRoutes.post('/invoice', ensureAuthenticated, salesController.create);

export { saleRoutes };
