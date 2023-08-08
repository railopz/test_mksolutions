import { inject, injectable } from 'tsyringe';

import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  public async execute({ name, description, price }: CreateProductDTO) {
    const findProductNameExists = await this.productsRepository.findByName(
      name.toLocaleUpperCase(),
    );

    if (findProductNameExists) {
      throw new AppError('Name already exists.', 409);
    }

    if (price < 0) {
      throw new AppError('The value cannot be negative', 400);
    }

    const product = await this.productsRepository.create({
      name: name.toLocaleUpperCase(),
      description,
      price,
    });

    return product;
  }
}

export { CreateProductUseCase };
