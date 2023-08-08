import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepositoryInterface from '@modules/users/repositories/interface/UsersRepositoryInterface';
import { UsersRepository } from '@modules/users/infrastructure/prisma/repositories/UsersRepository';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import { ProductsRepository } from '@modules/products/infrastructure/prisma/repositories/ProductsRepository';

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ProductsRepositoryInterface>(
  'ProductsRepository',
  ProductsRepository,
);
