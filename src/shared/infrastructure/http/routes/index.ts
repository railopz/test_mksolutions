import { Router } from 'express';

import { userRoutes } from '@modules/users/infrastructure/http/routes/users.routes';
import { sessionRoutes } from '@modules/users/infrastructure/http/routes/sessions.routes';
import { productRoutes } from '@modules/products/infrastructure/http/routes/product.routes';
import { saleRoutes } from '@modules/sales/infrastructure/http/routes/sales.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/sales', saleRoutes);

export default routes;
