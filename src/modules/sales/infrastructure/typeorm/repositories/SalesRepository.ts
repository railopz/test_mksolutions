import ProductsRepositoryInterface from "@modules/products/repositories/interface/ProductsRepositoryInterface";
import CreateProductDTO from "@modules/products/dtos/CreateProductDTO";
import ProductEntity from "../entities/Product";

class ProductsRepository implements ProductsRepositoryInterface {
  listAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(data: CreateProductDTO): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }
  save(product: ProductEntity): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

}


export {ProductsRepository}
