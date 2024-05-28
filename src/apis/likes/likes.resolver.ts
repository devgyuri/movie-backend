import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
}
