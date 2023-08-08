import { v4 as uuid } from 'uuid';

import SaleEntity, {
  SaleStatus,
} from '@modules/sales/infrastructure/typeorm/entities/Sale';
import SalesRepositoryInterface from '../interface/SalesRepositoryInterface';
import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';

class FakeSalesRepository implements SalesRepositoryInterface {
  private sales: SaleEntity[] = [];

  public async listAllTransaction(): Promise<SaleEntity[]> {
    return this.sales;
  }

  public async listTransactionsByHash(
    transaction_hash: string,
  ): Promise<SaleEntity[]> {
    const sales = this.sales.filter(
      sale => sale.transaction === transaction_hash,
    );
    return sales;
  }

  public async findTransactionsById(
    id: string,
  ): Promise<SaleEntity | undefined> {
    const sale = this.sales.find(sale => sale.id === id);
    return sale;
  }
  public async invoiceTransactionById(id: string): Promise<SaleEntity[]> {
    const findIndex = this.sales.findIndex(sale => sale.id === id);
    this.sales[findIndex].status = SaleStatus.PAY;
    return this.sales;
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
      status: SaleStatus.PENDING,
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
