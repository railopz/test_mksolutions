import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import { Product } from '@prisma/client';

export default interface ProductsRepositoryInterface {
  listAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: CreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
