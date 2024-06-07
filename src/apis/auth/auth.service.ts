import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAccessToken,
  IAuthServiceRemoveRefreshToken,
  IAuthServiceLogout,
} from './interfaces/auth-service.interface';
import { AuthInfo } from './dto/authInfo';
import { Token } from './dto/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}

  async loginUser({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<AuthInfo> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }

    this.setRefreshToken({ user, context });
    console.log('refresh token');

    const result = await this.getAccessToken({ user });
    return {
      accessToken: result.accessToken,
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    };
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): Token {
    return {
      accessToken: this.jwtService.sign(
        { sub: user.id }, //
        { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '1d' },
      ),
    };
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): Token {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'http://localhost:3000',
    // );
  }

  removeRefreshToken({ context }: IAuthServiceRemoveRefreshToken): void {
    context.res.setHeader('set-Cookie', `refreshToken=; path=/;`);
  }

  logoutUser({ context }: IAuthServiceLogout): string {
    this.removeRefreshToken({ context });
    return '성공적으로 로그아웃 하였습니다.';
  }
}
