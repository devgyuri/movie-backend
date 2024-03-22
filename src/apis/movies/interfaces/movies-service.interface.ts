import { Movie } from '../entities/movie.entity';

export interface IMoviesServiceCreateMovieOne {
  data: Movie;
}

export interface IMoviesServiceCreateMovieAll {
  data: Omit<Movie, 'avg_star' | 'cnt_star'>[];
}
