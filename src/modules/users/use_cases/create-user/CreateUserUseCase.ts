import { inject } from "tsyringe";
import UsersRepositoryInterface from "@modules/users/repositories/interface/UsersRepositoryInterface";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import CreateUserDTO from "@modules/users/dtos/CreateUserDTO";
import AppError from "@shared/errors/AppError";


class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  )  {}
  public async execute({
    name,
    email,
    password,
    is_admin
  }: CreateUserDTO) {
    const findByEmailExists = await this.usersRepository.findByEmail(email);

    if (findByEmailExists) {
      throw new AppError('E-mail already exists', 409)
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      is_admin
    })

    return user;
  }
}


export {CreateUserUseCase}
