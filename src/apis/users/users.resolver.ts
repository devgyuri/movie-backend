import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { IProfile } from './interfaces/users-service.interface';
import { Profile } from './dto/profile';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  // @Query(() => OmitType(User, ['password', 'likes', 'comments']))
  @Query(() => Profile)
  fetchUser(
    @Context() context: IContext, //
  ): Promise<IProfile> {
    console.log('================');
    console.log(context.req.user);
    console.log('================');
    return this.usersService.findOneById({ id: Number(context.req.user.id) });
  }

  @Mutation(() => Boolean)
  signUp(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ): Promise<boolean> {
    return this.usersService.create({ email, password, name });
  }
}
