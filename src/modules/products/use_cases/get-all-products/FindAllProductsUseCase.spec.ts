import { FindAllProductsUseCase } from './FindAllProductsUseCase';

import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import { CreateProductUseCase } from '../create-product/CreateProductUseCase';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let findAllProductsUseCase: FindAllProductsUseCase;
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
    findAllProductsUseCase = new FindAllProductsUseCase(fakeProductsRepository);
  });
  it('should be able list all products', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    const products = await findAllProductsUseCase.execute();

    expect(products).not.toHaveLength(0);
  });
  it('should be able empty list all products', async () => {
    const products = await findAllProductsUseCase.execute();
    expect(products).toHaveLength(0);
  });
});
