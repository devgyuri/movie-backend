export interface IMovieQueryResult {
  Query: string;
  KMAQuery: string;
  TotalCount: number;
  Data: IMovieMetadata[];
}

export interface IMovieMetadata {
  CollName: string;
  TotalCount: number;
  Count: number;
  Result: IMovie[];
}

export interface IMovie {
  DOCID: string;
  movieId: string;
  movieSeq: string;
  title: string;
  titleEng: string;
  titleOrg: string;
  titleEtc: string;
  prodYear: string;
  directors: IDirectors;
  actors: IActors;
  nation: string;
  company: string;
  plots: IPlots;
  runtime: string;
  rating: string;
  genre: string;
  kmdbUrl: string;
  type: string;
  use: string;
  episodes: string;
  ratedYn: string;
  repRatDate: string;
  repRlsDate: string;
  ratings: IRatings;
  keywords: string;
  posters: string;
  stlls: string;
  staffs: IStaffs;
  vods: IVods;
  openThtr: string;
  stat: IStat[];
  screenArea: string;
  screenCnt: string;
  salesAcc: string;
  audiAcc: string;
  statSouce: string;
  statDate: string;
  themeSong: string;
  soundtrack: string;
  fLocation: string;
  Awards1: string;
  Awards2: string;
  regDate: string;
  modDate: string;
  Codes: ICodes;
  CommCodes: ICommCodes;
  ALIAS: string;
}

export interface IDirectors {
  director: IDirector[];
}

export interface IDirector {
  directorNm: string;
  directorEnNm: string;
  directorId: string;
}

export interface IActors {
  actor: IActor[];
}

export interface IActor {
  actorNm: string;
  actorEnNm: string;
  actorId: string;
}

export interface IPlots {
  plot: IPlot[];
}

export interface IPlot {
  plotLang: string;
  plotText: string;
}

export interface IRatings {
  rating: IRating[];
}

export interface IRating {
  ratingMain: string;
  ratingDate: string;
  ratingNo: string;
  ratingGrade: string;
  releaseDate: string;
  runtime: string;
}

export interface IStaffs {
  staff: IStaff[];
}

export interface IStaff {
  staffNm: string;
  staffEnNm: string;
  staffRoleGroup: string;
  staffRole: string;
  staffEtc: string;
  staffId: string;
}

export interface IStat {
  screenArea: string;
  screenCnt: string;
  salesAcc: string;
  audiAcc: string;
  statSouce: string;
  statDate: string;
}

export interface ICodes {
  Code: ICode[];
}

export interface ICode {
  CodeNm: string;
  CodeNo: string;
}

export interface ICommCodes {
  CommCode: ICode[];
}

export interface IVods {
  vod: IVod[];
}

export interface IVod {
  vodClass: string;
  vodUrl: string;
}
