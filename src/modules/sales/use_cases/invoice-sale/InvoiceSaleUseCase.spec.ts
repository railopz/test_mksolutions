import FakeUsersRepository from '@modules/users/repositories/mock/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserUseCase } from '@modules/users/use_cases/create-user/CreateUserUseCase';
import { CreateProductUseCase } from '@modules/products/use_cases/create-product/CreateProductUseCase';
import { FakeProductsRepository } from '@modules/products/repositories/mock/FakeProductsRepository';
import { FakeSalesRepository } from '@modules/sales/repositories/mock/FakeSalesRepository';
import { FakeStockProductsRepository } from '@modules/products/repositories/mock/FakeStockProductsRepository';
import { ManagerProductIndStockUseCase } from '@modules/products/use_cases/add-product-in-stock/ManagerProductInStockUseCase';
import { CreateSaleUseCase } from '@modules/sales/use_cases/create-sale/CreateSaleUseCase';
import { InvoiceSaleUseCase } from './InvoiceSaleUseCase';
import AppError from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createProductUseCase: CreateProductUseCase;
let managerProductIndStockUseCase: ManagerProductIndStockUseCase;
let createSaleUseCase: CreateSaleUseCase;
let invoiceSaleUseCase: InvoiceSaleUseCase;

let fakeProductsRepository: FakeProductsRepository;
let fakeStockProductsRepository: FakeStockProductsRepository;
let fakeSalesRepository: FakeSalesRepository;

describe('Invoice products sale', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();

    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeStockProductsRepository = new FakeStockProductsRepository();
    fakeSalesRepository = new FakeSalesRepository();

    createUserUseCase = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createProductUseCase = new CreateProductUseCase(fakeProductsRepository);
    managerProductIndStockUseCase = new ManagerProductIndStockUseCase(
      fakeProductsRepository,
      fakeStockProductsRepository,
    );
    createSaleUseCase = new CreateSaleUseCase(
      fakeProductsRepository,
      fakeStockProductsRepository,
      fakeSalesRepository,
    );
    invoiceSaleUseCase = new InvoiceSaleUseCase(fakeSalesRepository);
  });

  it('Should be able invoice sale', async () => {
    const user = await createUserUseCase.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    const product1 = await createProductUseCase.execute({
      name: 'Camisa 10',
      description: 'Camisa do Neymar',
      price: 10.5,
    });

    const product2 = await createProductUseCase.execute({
      name: 'Camisa 12',
      description: 'Camisa do cassio',
      price: 22.5,
    });

    await managerProductIndStockUseCase.execute({
      product_id: product1.id,
      quantity: 10,
      type: 'Input',
    });

    await managerProductIndStockUseCase.execute({
      product_id: product2.id,
      quantity: 10,
      type: 'Input',
    });

    const transaction = await createSaleUseCase.execute({
      user_id: user.id,
      transactions: [
        {
          product_id: product1.id,
          quantity: 2,
        },
        {
          product_id: product2.id,
          quantity: 5,
        },
      ],
    });

    const invoice_sales = await invoiceSaleUseCase.execute(transaction.hash);
    expect(invoice_sales).not.toHaveLength(0);
    expect(invoice_sales[0].status).toEqual('pay');
  });

  it('Should not be able invoice sale, return sales empty', async () => {
    await expect(
      invoiceSaleUseCase.execute('hash_not_exist'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
