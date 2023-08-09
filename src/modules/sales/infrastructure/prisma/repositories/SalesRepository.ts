import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';
import SalesRepositoryInterface from '@modules/sales/repositories/interface/SalesRepositoryInterface';
import { Sale } from '@prisma/client';
import { prisma } from '@shared/infrastructure/prisma/prismaClient';

class SalesRepository implements SalesRepositoryInterface {
  public async listAllTransaction(): Promise<Sale[]> {
    throw new Error('Method not implemented.');
  }
  public async findTransactionsById(id: string): Promise<Sale | undefined> {
    throw new Error('Method not implemented.');
  }
  public async listTransactionsByHash(
    transaction_hash: string,
  ): Promise<Sale[]> {
    const transactions = await prisma.sale.findMany({
      where: {
        transaction: transaction_hash,
      },
    });
    return transactions;
  }
  public async invoiceTransactionById(id: string): Promise<Sale | undefined> {
    const transactions = await prisma.sale.findFirst({
      where: {
        id,
      },
    });
    return transactions || undefined;
  }
  public async createTransaction({
    transaction,
    user_id,
    client_id,
    product_id,
    quantity,
    total_price,
  }: CreateSaleDTO): Promise<Sale> {
    const sale = await prisma.sale.create({
      data: {
        transaction,
        user_id,
        client_id,
        product_id,
        quantity,
        total_price,
      },
    });
    return sale || undefined;
  }
  public async save({ id, status }: Sale): Promise<Sale> {
    return await prisma.sale.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}

export { SalesRepository };
