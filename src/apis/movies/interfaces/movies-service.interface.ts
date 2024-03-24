import { Actor } from 'src/apis/actors/entities/actor.entity';
import { Movie } from '../entities/movie.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Poster } from 'src/apis/posters/entities/poster.entity';
import { Vod } from 'src/apis/vods/entities/vod.entity';

type RequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

export interface IMoviesServiceCreateMovieOne {
  data: Movie;
}

export interface IMoviesServiceCreateMovieAll {
  movieArr: IMoviesServiceOpenMovieInfo[];
}

export type IMoviesServiceOpenMovieInfo = Omit<
  Movie,
  'avg_star' | 'cnt_star' | 'boxOffice'
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
