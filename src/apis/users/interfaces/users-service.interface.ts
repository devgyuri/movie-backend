import { FileUpload } from 'graphql-upload';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceFindProfile {
  id: number;
}

export interface IUsersServiceFindOneById {
  id: number;
}

export interface IUsersServiceFindOneByName {
  name: string;
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

export interface IUsersServiceIsDuplicatedName {
  name: string;
}

export interface IUsersServiceIsDuplicatedEmail {
  email: string;
}

export interface IUsersServiceUploadPicture {
  picture: FileUpload;
}
