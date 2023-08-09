import { CreateSaleUseCase } from '@modules/sales/use_cases/create-sale/CreateSaleUseCase';
import { FindAllSalesUseCase } from '@modules/sales/use_cases/find-all-sales/FindAllSalesUseCase';
import { InvoiceSaleUseCase } from '@modules/sales/use_cases/invoice-sale/InvoiceSaleUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SalesController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllSalesUseCase = container.resolve(FindAllSalesUseCase);
    const sales = await findAllSalesUseCase.execute();
    return response.json(sales);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { transactions, client_id } = request.body;

    const createSaleUseCase = container.resolve(CreateSaleUseCase);
    const sale = await createSaleUseCase.execute({
      transactions,
      client_id,
      user_id: id,
    });
    return response.json(sale);
  }

  public async invoice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { transaction_hash } = request.body;
    const invoiceSaleUseCase = container.resolve(InvoiceSaleUseCase);
    const invoices = await invoiceSaleUseCase.execute(transaction_hash);
    return response.json(invoices);
  }
}
