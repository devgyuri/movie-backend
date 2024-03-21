import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  createMovie(): Promise<Movie> {
    return this.moviesService.getOpenMovieInfo();
  }

  @Query(() => String)
  fetchTemp(): string {
    return 'Hello world!';
  }
}
