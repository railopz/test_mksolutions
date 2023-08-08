import { Router } from 'express';

import { sessionValidation } from '../middlewares/sessionValidation';
import UsersController from '@modules/users/infrastructure/http/controllers/UsersController';

const sessionRoutes = Router();

const usersController = new UsersController();

sessionRoutes.post('/', sessionValidation, usersController.auth);

export { sessionRoutes };
