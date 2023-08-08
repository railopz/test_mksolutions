import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { AuthenticationUserUseCase } from '@modules/users/use_cases/auth/AuthenticationUserUseCase';
import { FindUserByIdUseCase } from '@modules/users/use_cases/me/FindUserByIdUseCase';
import { isAdminMiddleware } from '../middlewares/isAdmin';

export default class UsersController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatedUser = container.resolve(AuthenticationUserUseCase);

    const user = await authenticatedUser.execute({
      email,
      password,
    });
    delete user.user.password;
    return response.json(user).status(201);
  }

  public async me(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const findUserById = container.resolve(FindUserByIdUseCase);
    const user = await findUserById.execute(id);
    delete user.password;
    return response.json(user).status(201);
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { name, email, password, is_admin } = request.body;

    isAdminMiddleware(request, response, next);

    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({
      name,
      email,
      password,
      is_admin,
    });

    delete user.password;

    return response.json(user).status(201);
  }
}
