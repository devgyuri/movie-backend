import { Args, Query, Resolver } from '@nestjs/graphql';
import { SeenService } from './seen.service';

@Resolver()
export class SeenResolver {
  constructor(
    private readonly seenService: SeenService, //
  ) {}

  @Query(() => Boolean)
  fetchSeen(
    @Args('userId') userId: number, //
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    return this.seenService.findByUserAndMovie({ userId, movieId });
  }
}
