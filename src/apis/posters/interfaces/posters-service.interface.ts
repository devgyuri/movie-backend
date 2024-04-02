import { IMoviesServiceOpenPosterInfo } from 'src/apis/movies/interfaces/movies-service.interface';

export interface IPostersServiceCreatePoster {
  url: string;
  movieId: string;
  isRep: boolean;
}

export interface IPostersServiceCreatePosterAll {
  posterArr: IMoviesServiceOpenPosterInfo[];
}

// export interface IPostersServiceCreatePoster {
//   poster: IMoviesServiceOpenPosterInfo;
// }
