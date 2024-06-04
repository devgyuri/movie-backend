import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AccessToken } from './dto/access-token.output';
import { IAccessToken } from './interfaces/auth-service.interface';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => AccessToken)
  loginUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<IAccessToken> {
    return this.authService.loginUser({ email, password, context });
  }

  @Mutation(() => String)
  logoutUser(@Context() context: IContext): string {
    return this.authService.logoutUser({ context });
  }

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => AccessToken)
  restoreAccessToken(
    @Context() context: IContext, //
  ): IAccessToken {
    return this.authService.restoreAccessToken({
      user: context.req.user,
    });
  }
}
