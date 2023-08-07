import { CreateUserUseCase } from "../create-user/CreateUserUseCase";
import FakeUsersRepository from "@modules/users/repositories/mock/FakeUsersRepository";
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";


let createUser: CreateUserUseCase;
let findUserByIdUseCase: FindUserByIdUseCase;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('Find User', () => {
  beforeEach(() => {
    fakeUsersRepository =  new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );

    findUserByIdUseCase = new FindUserByIdUseCase(
      fakeUsersRepository
    );
  })
  it('should be able find user by id', async () => {
    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      is_admin: true
    })
    const findUserExists = await findUserByIdUseCase.execute(user.id)
    expect(findUserExists).toEqual(user)
  })
})
