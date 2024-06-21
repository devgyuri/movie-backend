import { Args, Query, Resolver } from '@nestjs/graphql';
import { BoxOfficeService } from './boxOffice.service';
import { BoxOfficeToMovie } from '../boxOfficeToMovie/entities/boxOfficeToMovie.entity';

@Resolver()
export class BoxOfficeResolver {
  constructor(private readonly boxOfficeService: BoxOfficeService) {}

  @Query(() => [BoxOfficeToMovie])
  fetchBoxOffice(@Args('date') date: string): Promise<BoxOfficeToMovie[]> {
    return this.boxOfficeService.getBoxOfficeMovies({ dateString: date });
  }
}
