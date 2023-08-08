import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { CreateProductUseCase } from '../create-product/CreateProductUseCase';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import { ManagerProductIndStockUseCase } from './ManagerProductInStockUseCase';
import { FakeStockProductsRepository } from '@modules/products/repositories/mock/FakeStockProductsRepository';
import { FindStockByProductIdUseCase } from '../get-stock-by-product-id/FindStockByProductIdUseCase';
import AppError from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let findStockProductByIdUseCase: FindStockByProductIdUseCase;
let managerProductIndStockUseCase: ManagerProductIndStockUseCase;

let fakeProductsRepository: FakeProductsRepository;
let fakeStockProductsRepository: FakeStockProductsRepository;

describe('Manager stock products', () => {
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
    findStockProductByIdUseCase = new FindStockByProductIdUseCase(
      fakeStockProductsRepository,
    );
    managerProductIndStockUseCase = new ManagerProductIndStockUseCase(
      fakeProductsRepository,
      fakeStockProductsRepository,
    );
  });

  it('should be able include product in stock', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    await managerProductIndStockUseCase.execute({
      product_id: product.id,
      quantity: 10,
      type: 'Input',
    });

    const stock = await findStockProductByIdUseCase.execute(product.id);
    expect(stock.quantity).toEqual(10);
  });

  it('should be able output product in stock', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    await managerProductIndStockUseCase.execute({
      product_id: product.id,
      quantity: 20,
      type: 'Input',
    });

    const output = await managerProductIndStockUseCase.execute({
      product_id: product.id,
      quantity: 5,
      type: 'Output',
    });

    expect(output?.quantity).toEqual(15);
  });

  it('should not be able output product in stock', async () => {
    const product = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    await expect(
      managerProductIndStockUseCase.execute({
        product_id: product.id,
        quantity: 10,
        type: 'Output',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
