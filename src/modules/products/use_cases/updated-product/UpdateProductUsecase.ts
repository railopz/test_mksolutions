import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';

interface IRequest {
  product_id: string;
  name: string;
  description: string;
  price: number;
}

@injectable()
class UpdateProductUsecase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  public async execute({ product_id, name, description, price }: IRequest) {
    const findProductExists = await this.productsRepository.findById(
      product_id,
    );
    if (!findProductExists) {
      throw new AppError('Product not exists', 404);
    }
    const findProductByName = await this.productsRepository.findByName(
      name.toUpperCase(),
    );
    if (findProductByName) {
      throw new AppError('Product name already exists', 409);
    }
    if (price < 0) {
      throw new AppError('The value cannot be negative', 400);
    }

    findProductExists.name = name.toUpperCase();
    findProductExists.description = description;
    findProductExists.price = price;

    await this.productsRepository.save(findProductExists);
  }
}

export { UpdateProductUsecase };
