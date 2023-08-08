import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { CreateProductUseCase } from '../create-product/CreateProductUseCase';
import { UpdateProductUsecase } from './UpdateProductUsecase';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import { FindProductByIdUseCase } from '../get-product-by-id/FindProductByIdUseCase';

import AppError from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let findProductByIdUseCase: FindProductByIdUseCase;
let updateProductseCase: UpdateProductUsecase;
let fakeProductsRepository: FakeProductsRepository;

describe('Remove Product', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserUseCase = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );

    fakeProductsRepository = new FakeProductsRepository();
    createProductUseCase = new CreateProductUseCase(fakeProductsRepository);
    findProductByIdUseCase = new FindProductByIdUseCase(fakeProductsRepository);
    updateProductseCase = new UpdateProductUsecase(fakeProductsRepository);
  });
  it('should be able update product', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Neymar',
      price: 10.5,
    });

    product.name = 'Calça';

    await updateProductseCase.execute(product);
    const findProduct = await findProductByIdUseCase.execute(product.id);
    expect(findProduct.name).toEqual('Calça');
  });
  it('should not be able update product name already exists', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: '',
      price: 10.5,
    });

    const product2 = await createProductUseCase.execute({
      name: 'Calça',
      description: 'Adidas',
      price: 10.5,
    });

    const product3 = await createProductUseCase.execute({
      name: 'Chuteiras',
      description: 'Adidas',
      price: 10.5,
    });

    product.price = -20.2;
    product2.name = 'Camisa 10';
    product3.id = 'not_exists';

    await expect(updateProductseCase.execute(product)).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(updateProductseCase.execute(product2)).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(updateProductseCase.execute(product3)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
