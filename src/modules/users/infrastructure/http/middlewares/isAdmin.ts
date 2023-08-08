import { FindUserByIdUseCase } from '@modules/users/use_cases/me/FindUserByIdUseCase';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export async function isAdminMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const findUserById = container.resolve(FindUserByIdUseCase);
  const user = await findUserById.execute(id);

  if (!user || !user.is_admin) {
    throw new AppError('Access denied. Only admins allowed.', 401);
  }

  next();
}
