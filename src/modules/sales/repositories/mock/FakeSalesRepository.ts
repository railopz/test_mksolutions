import { v4 as uuid } from 'uuid';

import SalesRepositoryInterface from '../interface/SalesRepositoryInterface';
import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';
import { Sale } from '@prisma/client';
import { SaleEntity } from '@modules/sales/domain/entities/Sale';

class FakeSalesRepository implements SalesRepositoryInterface {
  private sales: Sale[] = [];

  public async listAllTransaction(): Promise<Sale[]> {
    return this.sales;
  }

  public async listTransactionsByHash(
    transaction_hash: string,
  ): Promise<Sale[]> {
    const sales = this.sales.filter(
      sale => sale.transaction === transaction_hash,
    );
    return sales;
  }

  public async findTransactionsById(id: string): Promise<Sale | undefined> {
    const sale = this.sales.find(sale => sale.id === id);
    return sale;
  }
  public async invoiceTransactionById(id: string): Promise<Sale[]> {
    const findIndex = this.sales.findIndex(sale => sale.id === id);
    this.sales[findIndex].status = 'pay';
    return this.sales;
  }
  public async createTransaction({
    transaction,
    user_id,
    client_id,
    product_id,
    quantity,
    total_price,
  }: CreateSaleDTO): Promise<Sale> {
    const sale = new SaleEntity({
      transaction,
      user_id,
      client_id: client_id || null,
      product_id,
      quantity,
      total_price,
    });
    this.sales.push(sale);
    return sale;
  }

  public async save(sale: Sale): Promise<Sale> {
    const findIndex = this.sales.findIndex(findSale => findSale.id === sale.id);
    this.sales[findIndex] = sale;
    return sale;
  }

  public async totalTransaction(transaction: string): Promise<Sale[]> {
    const sales = this.sales.filter(sale => sale.transaction === transaction);
    return sales;
  }
}

export { FakeSalesRepository };
