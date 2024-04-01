import { Query, Resolver } from '@nestjs/graphql';
import { BoxOfficeToMovieService } from './boxOfficeToMovie.service';

@Resolver()
export class BoxOfficeToMovieResolver {
  constructor(
    private readonly boxOfficeToMovieService: BoxOfficeToMovieService,
  ) {}

  @Query(() => String)
  fetchBoxOfficeToMovie(): string {
    return 'temp fetch boxofficeToMovie';
  }
}
