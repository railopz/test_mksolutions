import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';

@injectable()
class RemoveProductByIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
    @inject('StockProductsRepository')
    private stockProductsRepository: StockProductsRepositoryInterface,
  ) {}

  public async execute(id: string) {
    const findProductExists = await this.productsRepository.findById(id);
    if (!findProductExists) {
      throw new AppError('Product not exists', 404);
    }

    await this.stockProductsRepository.delete(findProductExists.id);
    await this.productsRepository.delete(findProductExists.id);
    return;
  }
}

export { RemoveProductByIdUseCase };
