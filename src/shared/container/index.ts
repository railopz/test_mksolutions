import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepositoryInterface from '@modules/users/repositories/interface/UsersRepositoryInterface';
import { UsersRepository } from '@modules/users/infrastructure/prisma/repositories/UsersRepository';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import { ProductsRepository } from '@modules/products/infrastructure/prisma/repositories/ProductsRepository';

import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';
import { StockProductsRepository } from '@modules/products/infrastructure/prisma/repositories/StockProductsRepository';

import SalesRepositoryInterface from '@modules/sales/repositories/interface/SalesRepositoryInterface';
import { SalesRepository } from '@modules/sales/infrastructure/prisma/repositories/SalesRepository';

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ProductsRepositoryInterface>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<StockProductsRepositoryInterface>(
  'StockProductsRepository',
  StockProductsRepository,
);

container.registerSingleton<SalesRepositoryInterface>(
  'SalesRepository',
  SalesRepository,
);
