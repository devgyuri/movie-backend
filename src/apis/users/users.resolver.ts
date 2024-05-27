import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ): Promise<User> {
    return this.usersService.create({ email, password, name });
  }

  @Query(() => String)
  fetchUser(): string {
    return 'dummy fetch user';
  }
}
