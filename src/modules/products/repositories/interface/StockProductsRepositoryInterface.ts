import ProductEntity from '@modules/products/infrastructure/typeorm/entities/Product';
import StockProductEntity from '@modules/products/infrastructure/typeorm/entities/StockProduct';
import CreateStockProductDTO from '@modules/products/dtos/CreateStockDTO';

interface IRequestInputOrOutputStock {
  product_id: string;
  quantity: number;
}

export default interface StockProductsRepositoryInterface {
  listAll(): Promise<StockProductEntity[]>;
  findStockByProductId(
    product_id: string,
  ): Promise<StockProductEntity | undefined>;
  create(data: CreateStockProductDTO): Promise<StockProductEntity>;
  save(stock: StockProductEntity): Promise<StockProductEntity>;
}
