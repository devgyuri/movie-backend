import { Movie } from '../entities/movie.entity';

export interface IMoviesServiceCreateMovieOne {
  data: Movie;
}

export interface IMoviesServiceCreateMovieAll {
  data: IMoviesServiceOpenMovieInfo[];
}

export type IMoviesServiceOpenMovieInfo = Omit<
  Movie,
  'avg_star' | 'cnt_star' | 'boxOffice' | 'genres'
>;
