import { inject, injectable } from 'tsyringe';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';

@injectable()
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
