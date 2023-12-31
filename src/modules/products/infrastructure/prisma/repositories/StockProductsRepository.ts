import CreateStockProductDTO from '@modules/products/dtos/CreateStockDTO';
import StockProductsRepositoryInterface from '@modules/products/repositories/interface/StockProductsRepositoryInterface';
import { prisma } from '@shared/infrastructure/prisma/prismaClient';
import { StockProduct } from '@prisma/client';

class StockProductsRepository implements StockProductsRepositoryInterface {
  public async listAll(): Promise<StockProduct[]> {
    return await prisma.stockProduct.findMany();
  }
  public async findStockByProductId(
    product_id: string,
  ): Promise<StockProduct | undefined> {
    const stock = await prisma.stockProduct.findFirst({
      where: {
        product_id: product_id,
      },
    });

    return stock || undefined;
  }
  public async create({
    product_id,
    quantity,
  }: CreateStockProductDTO): Promise<StockProduct> {
    const stock = await prisma.stockProduct.create({
      data: {
        product_id,
        quantity,
      },
    });

    return stock;
  }
  public async save(stock: StockProduct): Promise<StockProduct> {
    return await prisma.stockProduct.update({
      where: {
        product_id: stock.product_id,
      },
      data: {
        quantity: stock.quantity,
      },
    });
  }
  public async delete(product_id: string): Promise<void> {
    await prisma.stockProduct.delete({
      where: {
        product_id,
      },
    });
    return;
  }
}

export { StockProductsRepository };
