import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { Profile } from './dto/profile';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { Url } from './dto/url';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Profile)
  fetchUser(
    @Context() context: IContext, //
  ): Promise<Profile> {
    console.log('================');
    console.log(context.req.user);
    console.log('================');
    return this.usersService.findProfile({ id: Number(context.req.user.id) });
  }

  @Mutation(() => Boolean)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<boolean> {
    return this.usersService.createUser({ createUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Profile)
  updateUser(
    @Context() context: IContext, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<Profile> {
    console.log('update user resolver');
    console.log(updateUserInput);
    console.log(context.req.user);

    return this.usersService.updateUser({
      id: Number(context.req.user.id),
      updateUserInput,
    });
  }

  @Query(() => Boolean)
  nameDuplicationCheck(
    @Args('name') name: string, //
  ): Promise<boolean> {
    return this.usersService.isDuplicatedName({ name });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Url)
  uploadPicture(
    @Context() context: IContext, //
    @Args('picture', { type: () => GraphQLUpload }) picture: FileUpload,
  ): Promise<Url> {
    return this.usersService.uploadPicture({
      id: Number(context.req.user.id),
      picture,
    });
  }
}
