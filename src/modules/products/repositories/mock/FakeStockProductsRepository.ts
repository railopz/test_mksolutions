import { v4 as uuid } from 'uuid';
import StockProductEntity from '@modules/products/infrastructure/prisma/entities/StockProduct';
import StockProductsRepositoryInterface from '../interface/StockProductsRepositoryInterface';
import CreateStockProductDTO from '@modules/products/dtos/CreateStockDTO';

class FakeStockProductsRepository implements StockProductsRepositoryInterface {
  private stockProducts: StockProductEntity[] = [];

  public async listAll(): Promise<StockProductEntity[]> {
    return this.stockProducts;
  }

  public async findStockByProductId(
    product_id: string,
  ): Promise<StockProductEntity | undefined> {
    const product = this.stockProducts.find(
      findProduct => findProduct.product_id === product_id,
    );

    return product;
  }

  public async create({
    product_id,
    quantity,
  }: CreateStockProductDTO): Promise<StockProductEntity> {
    const stock_product = new StockProductEntity();
    Object.assign(stock_product, { id: uuid(), product_id, quantity });
    this.stockProducts.push(stock_product);
    return stock_product;
  }

  public async save(stock: StockProductEntity): Promise<StockProductEntity> {
    const findIndex = this.stockProducts.findIndex(
      findProduct => findProduct.id === stock.id,
    );
    this.stockProducts[findIndex] = stock;
    return stock;
  }
}

export { FakeStockProductsRepository };
