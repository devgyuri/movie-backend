import { IMoviesServiceOpenVodInfo } from 'src/apis/movies/interfaces/movies-service.interface';

export interface IVodsServiceCreateVod {
  url: string;
  movieId: string;
  isRep: boolean;
}

export interface IVodsServiceCreateVodAll {
  vodArr: IMoviesServiceOpenVodInfo[];
}

// export interface IVodsServiceCreateVod {
//   vod: IMoviesServiceOpenVodInfo;
// }
