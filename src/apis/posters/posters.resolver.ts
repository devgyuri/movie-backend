import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostersService } from './posters.service';
import { Poster } from './entities/poster.entity';

@Resolver()
export class PostersResolver {
  constructor(
    private readonly postersService: PostersService, //
  ) {}

  @Query(() => Poster)
  fetchRepPoster(
    @Args('movieId') movieId: string, //
  ): Promise<Poster> {
    return this.postersService.findRepPoster({ movieId });
  }
}
