import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';

export default interface ProductsRepositoryInterface {
  listAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | undefined>;
  findByName(name: string): Promise<ProductEntity | undefined>;
  create(data: CreateProductDTO): Promise<ProductEntity>;
  save(product: ProductEntity): Promise<ProductEntity>;
  deleteProduct(id: string): Promise<void>;
}
