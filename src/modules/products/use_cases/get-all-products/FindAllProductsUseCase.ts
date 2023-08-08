import { inject } from 'tsyringe';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import AppError from '@shared/errors/AppError';

class FindAllProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  public async execute() {
    const products = await this.productsRepository.listAll();
    return products;
  }
}

export { FindAllProductsUseCase };
