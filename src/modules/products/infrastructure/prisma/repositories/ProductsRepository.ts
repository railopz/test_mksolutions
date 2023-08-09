import ProductsRepositoryInterface from '@modules/products/repositories/interface/ProductsRepositoryInterface';
import CreateProductDTO from '@modules/products/dtos/CreateProductDTO';
import ProductEntity from '../entities/Product';
import { prisma } from '@shared/infrastructure/prisma/prismaClient';
import { Product } from '@prisma/client';

class ProductsRepository implements ProductsRepositoryInterface {
  public async listAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }
  public async findById(id: string): Promise<Product | undefined> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product || undefined;
  }
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await prisma.product.findFirst({
      where: {
        name,
      },
    });
    return product || undefined;
  }
  public async create({
    name,
    description,
    price,
  }: CreateProductDTO): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: {
          create: {
            quantity: 0,
          },
        },
      },
    });

    return product;
  }
  public async save({
    id,
    name,
    description,
    price,
  }: Product): Promise<Product> {
    return await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
      },
    });
  }
  public async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    return;
  }
}

export { ProductsRepository };
