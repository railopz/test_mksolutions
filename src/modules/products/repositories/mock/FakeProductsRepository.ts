import { v4 as uuid } from 'uuid';
import ProductsRepositoryInterface from '../interface/ProductsRepositoryInterface';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import { Product } from '@prisma/client';
import { ProductEntity } from '@modules/products/domain/Product';

class FakeProductsRepository implements ProductsRepositoryInterface {
  private products: Product[] = [];

  public async listAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);
    return findProduct;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.name === name);
    return findProduct;
  }

  public async create({
    name,
    description,
    price,
  }: CreateProductDTO): Promise<Product> {
    const product = new ProductEntity({
      name,
      description,
      price,
    });
    this.products.push(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );
    this.products[findIndex] = product;
    return product;
  }

  public async deleteProduct(id: string): Promise<void> {
    const findIndex = this.products.findIndex(product => product.id === id);

    if (findIndex !== -1) {
      this.products.splice(findIndex, 1);
    }
  }
}

export { FakeProductsRepository };
