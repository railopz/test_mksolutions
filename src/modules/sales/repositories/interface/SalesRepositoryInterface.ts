import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';
import SaleEntity from '@modules/sales/infrastructure/typeorm/entities/Sale';

export default interface SalesRepositoryInterface {
  listAllTransaction(): Promise<SaleEntity[]>;
  findTransactionsById(id: string): Promise<SaleEntity | undefined>;
  listTransactionsByHash(transaction_hash: string): Promise<SaleEntity[]>;
  totalTransaction(transaction: string): Promise<SaleEntity[]>;
  invoiceTransactionById(id: string): Promise<SaleEntity[]>;
  createTransaction(data: CreateSaleDTO): Promise<SaleEntity>;
  save(sale: SaleEntity): Promise<SaleEntity>;
}
