import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceFindProfile {
  id: number;
}

export interface IUsersServiceFindOneById {
  id: number;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceCreateUser {
  createUserInput: CreateUserInput;
}

export interface IUsersServiceUpdateUser {
  id: number;
  updateUserInput: UpdateUserInput;
}

// export type IProfile = Omit<User, 'password' | 'likes' | 'comments'>;
