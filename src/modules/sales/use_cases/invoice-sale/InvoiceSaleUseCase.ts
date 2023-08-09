import { inject, injectable } from 'tsyringe';
import SalesRepositoryInterface from '@modules/sales/repositories/interface/SalesRepositoryInterface';
import AppError from '@shared/errors/AppError';

@injectable()
class InvoiceSaleUseCase {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepositoryInterface,
  ) {}

  public async execute(transaction_hash: string) {
    const sales = await this.salesRepository.listTransactionsByHash(
      transaction_hash,
    );

    if (sales.length === 0) {
      throw new AppError('The Transaction is empty', 204);
    }

    for (const sale of sales) {
      if (sale.status === 'pending') {
        sale.status = 'pay';
        await this.salesRepository.save(sale);
      }
    }

    const paySales = await this.salesRepository.listTransactionsByHash(
      transaction_hash,
    );

    return paySales;
  }
}

export { InvoiceSaleUseCase };
