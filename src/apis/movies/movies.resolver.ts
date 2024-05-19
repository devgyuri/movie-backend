import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => String)
  initializeTable(): Promise<string> {
    return this.moviesService.createOpenMovieInfoAll();
  }

  @Query(() => Movie)
  fetchMovie(@Args('id') id: string): Promise<Movie> {
    return this.moviesService.findMovieById({ id });
  }
}
