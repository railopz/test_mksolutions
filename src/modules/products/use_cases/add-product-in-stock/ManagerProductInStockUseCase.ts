import { inject, injectable } from 'tsyringe';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';
import AppError from '@shared/errors/AppError';

interface IRequest {
  product_id: string;
  quantity: number;
  type: 'Input' | 'Output';
}

@injectable()
class ManagerProductIndStockUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,

    @inject('StockProductsRepository')
    private stockProductsRepository: StockProductsRepositoryInterface,
  ) {}
  public async execute({ product_id, quantity, type }: IRequest) {
    const findProductExist = await this.productsRepository.findById(product_id);

    if (!findProductExist) {
      throw new AppError('Product not found', 404);
    }

    let findProductExistInStock =
      await this.stockProductsRepository.findStockByProductId(product_id);

    if (findProductExistInStock) {
      if (type === 'Input') {
        findProductExistInStock.quantity += quantity;
      }

      if (type === 'Output') {
        findProductExistInStock.quantity -= quantity;
      }

      if (findProductExistInStock.quantity < 0) {
        throw new AppError('The quantity cannot be negative', 400);
      }

      await this.stockProductsRepository.save(findProductExistInStock);
      return findProductExistInStock;
    } else {
      if (type === 'Input') {
        findProductExistInStock = await this.stockProductsRepository.create({
          product_id: findProductExist.id,
          quantity,
        });

        await this.stockProductsRepository.save(findProductExistInStock);
        return findProductExistInStock;
      } else {
        throw new AppError('The quantity cannot be negative', 400);
      }
    }

    return findProductExistInStock;
  }
}

export { ManagerProductIndStockUseCase };
