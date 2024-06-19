import { Request, Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IOAuthUser {
  user: Omit<User, 'id'>;
}

export interface IAuthServiceLoginOAuth {
  req: Request & IOAuthUser;
  res: Response;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IAuthServiceRemoveRefreshToken {
  context: IContext;
}

export interface IAuthServiceLogout {
  context: IContext;
}
