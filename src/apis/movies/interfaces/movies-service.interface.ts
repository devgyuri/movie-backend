import { Actor } from 'src/apis/actors/entities/actor.entity';
import { Movie } from '../entities/movie.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Poster } from 'src/apis/posters/entities/poster.entity';
import { Vod } from 'src/apis/vods/entities/vod.entity';
import { IMovie } from 'src/commons/types/movieDetail.types';

type RequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

export interface IMoviesServiceGetTmdbImageUrl {
  actorName: string;
}

export interface IMoviesServiceCreateMovie {
  data: IMoviesServiceOpenMovieInfo;
}

export interface IMoviesServiceCreateMovieAll {
  movieArr: IMoviesServiceOpenMovieInfo[];
}

export type IMoviesServiceUpdateMovie = Omit<Partial<Movie>, 'id'> &
  Pick<Movie, 'id'>;

export type IMoviesServiceOpenMovieInfo = Omit<
  Movie,
  | 'avg_star'
  | 'cnt_star'
  | 'boxOfficeToMovies'
  | 'posters'
  | 'stills'
  | 'vods'
  | 'comments'
  | 'likes'
  | 'seen'
>;

export type IMoviesServiceOpenPosterInfo = Omit<Poster, 'id'>;

export type IMoviesServiceOpenVodInfo = Omit<Vod, 'id'>;

export interface IMoviesServiceInsertActorsInfoArgs {
  actorNames: string[];
}

export type IMoviesServiceInsertActorsInfo = Promise<RequiredBy<Actor, 'id'>[]>;

export interface IMoviesServiceInsertDirectorsInfoArgs {
  directorNames: string[];
}

export type IMoviesServiceInsertDirectorsInfo = Promise<
  RequiredBy<Director, 'id'>[]
>;

export interface IMoviesServiceInsertGenresInfoArgs {
  genreNames: string[];
}

export type IMoviesServiceInsertGenresInfo = Promise<RequiredBy<Genre, 'id'>[]>;

export interface IMoviesServiceCreateOpenMovieInfo {
  rawData: IMovie;
}

export interface IMoviesServiceCreateMovieByTitleAndRlsDt {
  title: string;
  releaseDate: string;
}

export interface IMoviesServiceFindMovieByTitleAndRlsDt {
  title: string;
  releaseDate: string;
}

export interface IMoviesServiceFindMovieById {
  id: string;
}

export interface IMoviesServiceUpdateStar {
  id: string;
  star: number;
  updateStatus: UPDATE_STAR_STATUS_ENUM;
}

export enum UPDATE_STAR_STATUS_ENUM {
  CREATE,
  UPDATE,
  DELETE,
}
