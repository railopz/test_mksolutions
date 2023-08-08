import { inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';

class UpdateProductUsecase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  public async execute(product: ProductEntity) {
    const findProductExists = await this.productsRepository.findById(
      product.id,
    );
    if (!findProductExists) {
      throw new AppError('Product not exists', 404);
    }
    const findProductByName = await this.productsRepository.findByName(
      product.name.toUpperCase(),
    );
    if (findProductByName) {
      throw new AppError('Product name already exists', 409);
    }
    if (product.price < 0) {
      throw new AppError('The value cannot be negative', 400);
    }
    await this.productsRepository.save(product);
  }
}

export { UpdateProductUsecase };
