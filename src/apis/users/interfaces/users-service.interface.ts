export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceCreate {
  email: string;
  password: string;
  name: string;
}
