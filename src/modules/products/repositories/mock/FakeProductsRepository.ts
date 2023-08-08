import { v4 as uuid } from 'uuid';
import ProductsRepositoryInterface from '../interface/ProductsRepositoryInterface';
import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';

class FakeProductsRepository implements ProductsRepositoryInterface {
  private products: ProductEntity[] = [];

  public async listAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  public async findById(id: string): Promise<ProductEntity | undefined> {
    const findProduct = this.products.find(product => product.id === id);
    return findProduct;
  }

  public async findByName(name: string): Promise<ProductEntity | undefined> {
    const findProduct = this.products.find(product => product.name === name);
    return findProduct;
  }

  public async create({
    name,
    description,
    price,
  }: CreateProductDTO): Promise<ProductEntity> {
    const product = new ProductEntity();
    Object.assign(product, { id: uuid(), name, description, price });
    this.products.push(product);
    return product;
  }

  public async save(product: ProductEntity): Promise<ProductEntity> {
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
