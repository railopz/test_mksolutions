import { CreateProductUseCase } from './CreateProductUseCase';

import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import AppError from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let fakeProductsRepository: FakeProductsRepository;

describe('Create product', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserUseCase = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );

    fakeProductsRepository = new FakeProductsRepository();
    createProductUseCase = new CreateProductUseCase(fakeProductsRepository);
  });
  it('should be able create new product', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    expect(product.price).toEqual(10.5);
  });

  it('should be able create new product', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    await expect(
      createProductUseCase.execute({
        name: 'Camisa 10',
        description: 'Camisa do Neymar',
        price: 10.5,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able the value connot be negative', async () => {
    await expect(
      createProductUseCase.execute({
        name: 'Camisa 10',
        description: 'Camisa do Neymar',
        price: -1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
