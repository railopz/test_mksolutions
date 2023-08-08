import { prisma } from '@shared/infrastructure/prisma/prismaClient';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import UsersRepositoryInterface from '@modules/users/repositories/interface/UsersRepositoryInterface';
import { User } from '@prisma/client';

class UsersRepository implements UsersRepositoryInterface {
  public async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user || undefined;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user || undefined;
  }
  public async create({
    name,
    email,
    password,
    is_admin,
  }: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        is_admin,
      },
    });

    return user;
  }
  public async save({
    id,
    name,
    email,
    password,
    is_admin,
  }: User): Promise<User> {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        is_admin,
      },
    });
  }
}

export { UsersRepository };
