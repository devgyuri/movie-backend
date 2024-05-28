export interface ILikesServiceFindByUserAndMovie {
  userId: number;
  movieId: string;
}

export interface ILikesServiceSaveLike {
  userId: number;
  movieId: string;
}
