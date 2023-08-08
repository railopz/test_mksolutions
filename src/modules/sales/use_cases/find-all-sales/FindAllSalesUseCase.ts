import { inject } from 'tsyringe';
import SalesRepositoryInterface from '@modules/sales/repositories/interface/SalesRepositoryInterface';

class FindAllSalesUseCase {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepositoryInterface,
  ) {}

  public async execute() {
    const sales = await this.salesRepository.listAllTransaction();
    return sales;
  }
}

export { FindAllSalesUseCase };
