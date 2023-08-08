import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { FindAllProductsUseCase } from '@modules/products/use_cases/get-all-products/FindAllProductsUseCase';
import { FindProductByIdUseCase } from '@modules/products/use_cases/get-product-by-id/FindProductByIdUseCase';
import { FindStockByProductIdUseCase } from '@modules/products/use_cases/get-stock-by-product-id/FindStockByProductIdUseCase';
import { isAdminMiddleware } from '@modules/users/infrastructure/http/middlewares/isAdmin';
import { ManagerProductIndStockUseCase } from '@modules/products/use_cases/add-product-in-stock/ManagerProductInStockUseCase';
import { UpdateProductUsecase } from '@modules/products/use_cases/updated-product/UpdateProductUsecase';
import { CreateProductUseCase } from '@modules/products/use_cases/create-product/CreateProductUseCase';
import { RemoveProductByIdUseCase } from '@modules/products/use_cases/remove-product/RemoveProductByIdUseCase';

export default class ProductsController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findProducts = container.resolve(FindAllProductsUseCase);
    const products = findProducts.execute();
    return response.json(products);
  }

  public async findProductById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_id } = request.body;

    const findProduct = container.resolve(FindProductByIdUseCase);
    const product = findProduct.execute(product_id);
    return response.json(product);
  }

  public async findStockByProductId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_id } = request.params;
    const findStockProduct = container.resolve(FindStockByProductIdUseCase);
    const stockProduct = findStockProduct.execute(product_id);
    return response.json(stockProduct);
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { name, description, price } = request.body;

    isAdminMiddleware(request, response, next);

    const createProductUseCase = container.resolve(CreateProductUseCase);
    const product = createProductUseCase.execute({
      name,
      description,
      price,
    });
    return response.json(product);
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { product_id } = request.params;
    const { name, description, price } = request.body;

    isAdminMiddleware(request, response, next);

    const updateProductUsecase = container.resolve(UpdateProductUsecase);
    const product = updateProductUsecase.execute({
      product_id,
      name,
      description,
      price,
    });
    return response.json(product);
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { product_id } = request.params;

    isAdminMiddleware(request, response, next);

    const removeProductByIdUseCase = container.resolve(
      RemoveProductByIdUseCase,
    );
    await removeProductByIdUseCase.execute(product_id);
    return response.status(204);
  }

  public async managerStock(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { product_id } = request.params;
    const { quantity, type } = request.body;

    isAdminMiddleware(request, response, next);

    const managerStockProduct = container.resolve(
      ManagerProductIndStockUseCase,
    );
    const stockProduct = managerStockProduct.execute({
      product_id,
      quantity,
      type,
    });
    return response.json(stockProduct);
  }
}
