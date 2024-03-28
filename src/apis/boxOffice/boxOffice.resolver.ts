import { Args, Query, Resolver } from '@nestjs/graphql';
import { BoxOfficeService } from './boxOffice.service';
import { Movie } from '../movies/entities/movie.entity';

@Resolver()
export class BoxOfficeResolver {
  constructor(private readonly boxOfficeService: BoxOfficeService) {}

  @Query(() => String)
  fetchBoxOffice(@Args('date') date: string): Promise<string> {
    return this.boxOfficeService.getBoxOfficeMovies({ dateString: date });
  }
}
