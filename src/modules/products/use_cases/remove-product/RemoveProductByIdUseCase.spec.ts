import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { CreateProductUseCase } from '../create-product/CreateProductUseCase';
import { RemoveProductByIdUseCase } from './RemoveProductByIdUseCase';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import { FindProductByIdUseCase } from '../get-product-by-id/FindProductByIdUseCase';

import AppError from '@shared/errors/AppError';
import { FakeStockProductsRepository } from '@modules/products/repositories/mock/FakeStockProductsRepository';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let findProductByIdUseCase: FindProductByIdUseCase;
let removeProductByIdUseCase: RemoveProductByIdUseCase;
let fakeProductsRepository: FakeProductsRepository;
let fakeStockProductsRepository: FakeStockProductsRepository;

describe('Remove Product', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserUseCase = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );

    fakeProductsRepository = new FakeProductsRepository();
    fakeStockProductsRepository = new FakeStockProductsRepository();
    createProductUseCase = new CreateProductUseCase(fakeProductsRepository);
    findProductByIdUseCase = new FindProductByIdUseCase(fakeProductsRepository);
    removeProductByIdUseCase = new RemoveProductByIdUseCase(
      fakeProductsRepository,
      fakeStockProductsRepository,
    );
  });
  it('should be able remove product by id', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });
    await removeProductByIdUseCase.execute(product.id);

    await expect(
      findProductByIdUseCase.execute(product.id),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not fail when deleting a non-existent product', async () => {
    await expect(
      removeProductByIdUseCase.execute('non_existent_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
