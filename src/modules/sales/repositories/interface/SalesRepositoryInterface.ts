import CreateSaleDTO from '@modules/sales/dtos/CreateSaleDTO';
import SaleEntity from '@modules/sales/infrastructure/typeorm/entities/Sale';

export default interface SalesRepositoryInterface {
  createTransaction(data: CreateSaleDTO): Promise<SaleEntity>;
  totalTransaction(transaction: string): Promise<SaleEntity[]>;
}
