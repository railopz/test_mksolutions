import CreateUserDTO from "@modules/users/dtos/CreateUserDTO";
import UsersRepositoryInterface from "@modules/users/repositories/interface/UsersRepositoryInterface";
import User from "@modules/users/infrastructure/typeorm/entities/User";

class UsersRepository implements UsersRepositoryInterface {
  findById(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  create(data: CreateUserDTO): Promise<User> {
    throw new Error("Method not implemented.");
  }
  save(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}


export {UsersRepository}
