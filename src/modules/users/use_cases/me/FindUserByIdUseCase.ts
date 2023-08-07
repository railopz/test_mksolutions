import UsersRepositoryInterface from "@modules/users/repositories/interface/UsersRepositoryInterface";
import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";

class FindUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

  ){}
  public async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user;
  }
}

export {FindUserByIdUseCase}
