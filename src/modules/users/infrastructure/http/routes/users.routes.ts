import { Router } from 'express';

import { createUserValidation } from '../middlewares/createUserValidation';
import ensureAuthenticated from '@modules/users/infrastructure/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infrastructure/http/controllers/UsersController';

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.get('/me', ensureAuthenticated, usersController.me);

userRoutes.post(
  '/',
  ensureAuthenticated,
  createUserValidation,
  usersController.create,
);

export { userRoutes };
