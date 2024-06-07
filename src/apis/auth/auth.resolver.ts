import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { IAccessToken } from './interfaces/auth-service.interface';
import { AuthInfo } from './dto/authInfo';
import { Token } from './dto/token';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => AuthInfo)
  loginUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<AuthInfo> {
    return this.authService.loginUser({ email, password, context });
  }

  @Mutation(() => String)
  logoutUser(@Context() context: IContext): string {
    return this.authService.logoutUser({ context });
  }

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => Token)
  restoreAccessToken(
    @Context() context: IContext, //
  ): Token {
    return this.authService.restoreAccessToken({
      user: context.req.user,
    });
  }
}
