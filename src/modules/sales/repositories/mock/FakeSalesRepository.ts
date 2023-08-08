import { v4 as uuid } from 'uuid';

import SaleEntity from '@modules/sales/infrastructure/typeorm/entities/Sale';
import SalesRepositoryInterface from '../interface/SalesRepositoryInterface';
import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';

class FakeSalesRepository implements SalesRepositoryInterface {
  private sales: SaleEntity[] = [];

  public async listAllTransaction(): Promise<SaleEntity[]> {
    return this.sales;
  }
  public async listAllTransactionPending(): Promise<SaleEntity[]> {
    const sales = this.sales.filter(sale => sale.status === 'pending');
    return sales;
  }

  public async createTransaction({
    transaction,
    user_id,
    client_id,
    product_id,
    quantity,
    total_price,
  }: CreateSaleDTO): Promise<SaleEntity> {
    const sale = new SaleEntity();
    Object.assign(sale, {
      id: uuid(),
      transaction,
      user_id,
      client_id,
      product_id,
      quantity,
      total_price,
    });
    this.sales.push(sale);
    return sale;
  }

  public async save(sale: SaleEntity): Promise<SaleEntity> {
    const findIndex = this.sales.findIndex(findSale => findSale.id === sale.id);
    this.sales[findIndex] = sale;
    return sale;
  }

  public async totalTransaction(transaction: string): Promise<SaleEntity[]> {
    const sales = this.sales.filter(sale => sale.transaction === transaction);
    return sales;
  }
}

export { FakeSalesRepository };
