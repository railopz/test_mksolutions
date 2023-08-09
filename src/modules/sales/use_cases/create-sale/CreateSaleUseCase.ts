import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import * as qrcode from 'qrcode';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';
import SalesRepositoryInterface from '@modules/sales/repositories/interface/SalesRepositoryInterface';
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

@injectable()
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
          if (stock.quantity < transaction.quantity) {
            throw new AppError('Insuficient Stock', 400);
          }

          const totalPrice =
            transaction.quantity * parseFloat(product.price.toString());

          await this.salesRepository.createTransaction({
            transaction: transactionHash,
            product_id: product.id,
            quantity: transaction.quantity,
            total_price: totalPrice,
            user_id,
            client_id,
          });

          stock.quantity -= transaction.quantity;
          await this.stockProductsRepository.save(stock);
        }
      }
    }

    const totalTransactions = await this.salesRepository.listTransactionsByHash(
      transactionHash,
    );

    const totalReduce = totalTransactions.reduce(
      (total, sale) => total + parseFloat(sale.total_price.toString()),
      0,
    );

    const formattedTotal = totalReduce.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const qrCodeData = JSON.stringify({
      transaction: transactionHash,
      total_amount: formattedTotal,
    });

    const qrCodeBase64 = await qrcode.toDataURL(qrCodeData);

    return {
      hash: transactionHash,
      transactions: totalTransactions,
      qrcode: qrCodeBase64,
    };
  }
}

export { CreateSaleUseCase };
