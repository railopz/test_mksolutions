import { User } from '@modules/users/domain/entities/User';

class UserPresentation {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;

  constructor({ id, name, email, is_admin }: User) {
    this.id = id ? id : '';
    this.name = name;
    this.email = email;
    this.is_admin = is_admin ? is_admin : false;
  }
}

export { UserPresentation };
