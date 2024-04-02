import { BoxOffice } from 'src/apis/boxOffice/entities/boxOffice.entity';
import { Movie } from 'src/apis/movies/entities/movie.entity';

export interface IBoxOfficeToMovieServiceCreateBoxOfficeToMovie {
  boxOffice: BoxOffice;
  movie: Movie;
  rank: number;
}
