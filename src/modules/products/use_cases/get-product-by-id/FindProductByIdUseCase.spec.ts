import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { CreateProductUseCase } from '../create-product/CreateProductUseCase';
import { FindProductByIdUseCase } from './FindProductByIdUseCase';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import AppError from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let findProductByIdUseCase: FindProductByIdUseCase;
let fakeProductsRepository: FakeProductsRepository;

describe('Find Product', () => {
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
  });
  it('should be able find product by id', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });
    const findProduct = await findProductByIdUseCase.execute(product.id);
    expect(findProduct.id).toEqual(product.id);
  });
  it('should not be able find product by id not exists', async () => {
    await expect(
      findProductByIdUseCase.execute('product_not_exists'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
