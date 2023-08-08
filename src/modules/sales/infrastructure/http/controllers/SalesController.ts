import { CreateSaleUseCase } from '@modules/sales/use_cases/create-sale/CreateSaleUseCase';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

export default class SalesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { transactions, client_id } = request.body;

    const createSaleUseCase = container.resolve(CreateSaleUseCase);
    const sale = createSaleUseCase.execute({
      transactions,
      client_id,
      user_id: id,
    });
    return response.json(sale);
  }
}
