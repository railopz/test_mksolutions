import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';
import { Sale } from '@prisma/client';

export default interface SalesRepositoryInterface {
  listAllTransaction(): Promise<Sale[]>;
  findTransactionsById(id: string): Promise<Sale | undefined>;
  listTransactionsByHash(transaction_hash: string): Promise<Sale[]>;
  invoiceTransactionById(id: string): Promise<Sale | undefined>;
  createTransaction(data: CreateSaleDTO): Promise<Sale>;
  save(sale: Sale): Promise<Sale>;
}
