export default interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
}
