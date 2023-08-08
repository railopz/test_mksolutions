class User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  is_admin?: boolean;

  private constructor({ name, email, password, is_admin }: User) {
    return Object.assign(this, {
      name,
      email,
      password,
      is_admin,
    });
  }

  static create({ name, email, password, is_admin }: User) {
    const user = new User({ name, email, password, is_admin });
    return user;
  }
}

export { User };
