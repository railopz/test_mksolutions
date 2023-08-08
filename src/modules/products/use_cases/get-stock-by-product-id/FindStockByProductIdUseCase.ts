import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindStockByProductIdUseCase {
  constructor(
    @inject('StockProductsRepository')
    private stockProductsRepository: StockProductsRepositoryInterface,
  ) {}
  public async execute(product_id: string) {
    const findProduct = await this.stockProductsRepository.findStockByProductId(
      product_id,
    );
    if (!findProduct) {
      throw new AppError('Product not is stock', 404);
    }
    return findProduct;
  }
}

export { FindStockByProductIdUseCase };
