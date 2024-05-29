import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';

@Resolver()
export class LikesResolver {
  constructor(
    private readonly likesService: LikesService, //
  ) {}

  @Query(() => Boolean)
  fetchLike(
    @Args('userId') userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.findByUserAndMovie({ userId, movieId });
  }

  @Mutation(() => Boolean)
  saveLike(
    @Args('userId') userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.saveLike({
      userId,
      movieId,
    });
  }

  @Mutation(() => Boolean)
  deleteLike(
    @Args('userId') userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.likesService.deleteLike({
      userId,
      movieId,
    });
  }

  @Query(() => Int)
  fetchLikeCount(
    @Args('movieId') movieId: string, //
  ): Promise<number> {
    return this.likesService.fetchLikeCountByMovie({
      movieId,
    });
  }
}
