import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';

@Resolver()
export class LikesResolver {
  constructor(
    private readonly likesService: LikesService, //
  ) {}

  @Query(() => Boolean)
  fetchLike(
    @Args('userId', { type: () => Int }) userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.findByUserAndMovie({ userId, movieId });
  }

  @Mutation(() => Boolean)
  createLike(
    @Args('userId', { type: () => Int }) userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.createLike({
      userId,
      movieId,
    });
  }

  @Mutation(() => Boolean)
  deleteLike(
    @Args('userId', { type: () => Int }) userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.deleteLike({
      userId,
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
