import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infrastructure/http/middlewares/ensureAuthenticated';
import ProductsController from '@modules/products/infrastructure/http/controllers/ProductsController';
import {
  idValidatedMiddleware,
  createOrUpdateProductMiddleware,
  createStockProductMiddleware,
} from '@modules/products/infrastructure/http/middlewares/productValidate';

const productRoutes = Router();

const productsController = new ProductsController();

productRoutes.get('/', ensureAuthenticated, productsController.listAll);

productRoutes.post(
  '/',
  ensureAuthenticated,
  createOrUpdateProductMiddleware,
  productsController.create,
);

productRoutes.patch(
  '/:product_id',
  ensureAuthenticated,
  idValidatedMiddleware,
  createOrUpdateProductMiddleware,
  productsController.update,
);

productRoutes.delete(
  '/:product_id',
  ensureAuthenticated,
  idValidatedMiddleware,
  productsController.delete,
);

productRoutes.get(
  '/:product_id',
  ensureAuthenticated,
  idValidatedMiddleware,
  productsController.findProductById,
);

productRoutes.get(
  '/stock/:product_id',
  ensureAuthenticated,
  idValidatedMiddleware,
  productsController.findStockByProductId,
);

productRoutes.post(
  '/stock/manager/:product_id',
  ensureAuthenticated,
  idValidatedMiddleware,
  createStockProductMiddleware,
  productsController.managerStock,
);

export { productRoutes };
