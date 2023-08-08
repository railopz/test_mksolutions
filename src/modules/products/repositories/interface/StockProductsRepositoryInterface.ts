import CreateStockProductDTO from '@modules/products/dtos/CreateStockDTO';
import { StockProduct } from '@prisma/client';

export default interface StockProductsRepositoryInterface {
  listAll(): Promise<StockProduct[]>;
  findStockByProductId(product_id: string): Promise<StockProduct | undefined>;
  create(data: CreateStockProductDTO): Promise<StockProduct>;
  save(stock: StockProduct): Promise<StockProduct>;
}
