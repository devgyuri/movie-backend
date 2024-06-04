import { User } from '../entities/user.entity';

export interface IUsersServiceFindOneById {
  id: number;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceCreate {
  email: string;
  password: string;
  name: string;
}

export type IProfile = Omit<User, 'password' | 'likes' | 'comments'>;
