import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepositoryInterface from '@modules/users/repositories/interface/UsersRepositoryInterface';
import { UsersRepository } from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);
