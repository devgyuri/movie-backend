import { Args, Query, Resolver } from '@nestjs/graphql';
import { BoxOfficeService } from './boxOffice.service';
import { Movie } from '../movies/entities/movie.entity';

@Resolver()
export class BoxOfficeResolver {
  constructor(private readonly boxOfficeService: BoxOfficeService) {}

  @Query(() => [Movie])
  fetchBoxOffice(@Args('date') date: string): Promise<Movie[]> {
    return this.boxOfficeService.getBoxOfficeMovies({ dateString: date });
  }
}
