import { inject } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';
import SalesRepositoryInterface from '@modules/sales/repositories/interface/SalesRepositoryInterface';
import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface ITransaction {
  product_id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  client_id?: string;
  transactions: ITransaction[];
}

class CreateSaleUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
    @inject('StockProductsRepository')
    private stockProductsRepository: StockProductsRepositoryInterface,
    @inject('SalesRepository')
    private salesRepository: SalesRepositoryInterface,
  ) {}

  public async execute({ transactions, user_id, client_id }: IRequest) {
    const transactionHash = uuid();

    if (transactions.length === 0) {
      throw new AppError('Products not empty', 400);
    }

    for (const transaction of transactions) {
      const product = await this.productsRepository.findById(
        transaction.product_id,
      );

      if (product) {
        const stock = await this.stockProductsRepository.findStockByProductId(
          product.id,
        );

        if (stock) {
          const totalPrice = transaction.quantity * product.price;

          await this.salesRepository.createTransaction({
            transaction: transactionHash,
            product_id: product.id,
            quantity: transaction.quantity,
            total_price: totalPrice,
            user_id,
            client_id,
          });
        }
      }
    }

    const totalTransactions = await this.salesRepository.totalTransaction(
      transactionHash,
    );

    const totalReduce = totalTransactions.reduce(
      (total, sale) => total + sale.total_price,
      0,
    );

    const formattedTotal = totalReduce.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    console.log('Total a pagar', formattedTotal);
  }
}

export { CreateSaleUseCase };
