import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class LikesResolver {
  constructor(
    private readonly likesService: LikesService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Boolean)
  fetchLike(
    @Context() context: IContext, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.findByUserAndMovie({
      userId: Number(context.req.user.id),
      movieId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  createLike(
    @Context() context: IContext, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.createLike({
      userId: Number(context.req.user.id),
      movieId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteLike(
    @Context() context: IContext, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.deleteLike({
      userId: Number(context.req.user.id),
      movieId,
    });
  }

  @Query(() => Int)
  fetchLikeCountByMovie(
    @Args('movieId') movieId: string, //
  ): Promise<number> {
    return this.likesService.fetchLikeCountByMovie({
      movieId,
    });
  }
}
