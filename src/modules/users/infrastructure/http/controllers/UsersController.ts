import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { AuthenticationUserUseCase } from '@modules/users/use_cases/auth/AuthenticationUserUseCase';
import { FindUserByIdUseCase } from '@modules/users/use_cases/me/FindUserByIdUseCase';
import { isAdminMiddleware } from '../middlewares/isAdmin';
import { UserPresentation } from '../presentation/UserResponse';

export default class UsersController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatedUser = container.resolve(AuthenticationUserUseCase);

    const user = await authenticatedUser.execute({
      email,
      password,
    });

    const userPresentation = new UserPresentation(user.user);

    return response
      .json({
        user: userPresentation,
        token: user.token,
      })
      .status(201);
  }

  public async me(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findUserById = container.resolve(FindUserByIdUseCase);
    const user = await findUserById.execute(id);

    const userPresentation = new UserPresentation(user);
    return response.json(userPresentation).status(201);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, is_admin } = request.body;

    await isAdminMiddleware(request, response, () => {});

    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({
      name,
      email,
      password,
      is_admin,
    });

    return response.json(user);
  }
}
