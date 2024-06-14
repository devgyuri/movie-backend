import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SeenService } from './seen.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class SeenResolver {
  constructor(
    private readonly seenService: SeenService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Boolean)
  fetchLike(
    @Context() context: IContext, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.seenService.findByUserAndMovie({
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
    return this.seenService.createSeen({
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
    return this.seenService.deleteSeen({
      userId: Number(context.req.user.id),
      movieId,
    });
  }

  @Query(() => Int)
  fetchLikeCountByMovie(
    @Args('movieId') movieId: string, //
  ): Promise<number> {
    return this.seenService.fetchSeenCountByMovie({
      movieId,
    });
  }
}
