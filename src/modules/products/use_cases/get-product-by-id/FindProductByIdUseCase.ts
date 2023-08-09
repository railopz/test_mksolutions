import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';

@injectable()
class FindProductByIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  public async execute(id: string) {
    const findProductExists = await this.productsRepository.findById(id);

    if (!findProductExists) {
      throw new AppError('Product not exists', 404);
    }

    return findProductExists;
  }
}

export { FindProductByIdUseCase };
