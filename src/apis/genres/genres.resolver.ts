import { Query, Resolver } from '@nestjs/graphql';
import { GenresService } from './genres.service';

@Resolver()
export class GenresResolver {
  constructor(
    private readonly genresService: GenresService, //
  ) {}

  @Query(() => String)
  fetchActor(): string {
    return 'dummy fetch actor';
  }
}
