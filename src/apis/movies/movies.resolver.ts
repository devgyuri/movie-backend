import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => String)
  initializeTable(): Promise<string> {
    return this.moviesService.getOpenMovieInfo();
  }

  @Query(() => String)
  fetchTemp(): string {
    return 'Hello world!';
  }
}
