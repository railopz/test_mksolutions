import FakeUsersRepository from "@modules/users/repositories/mock/FakeUsersRepository";
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserUseCase } from "./CreateUserUseCase";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserUseCase;


describe('Create user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it ('should be able create new user', async () => {
    const response = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(response.email).toEqual('johndoe@example.com');
  })

  it ('should not be able create new user by email exists', async () => {
    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    await expect(
      createUser.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
