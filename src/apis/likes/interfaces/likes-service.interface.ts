export interface ILikesServiceFindByUserAndMovie {
  userId: number;
  movieId: string;
}

export interface ILikesServiceSaveLike {
  userId: number;
  movieId: string;
}

export interface ILikesServiceDeleteLike {
  userId: number;
  movieId: string;
}

export interface ILikesServiceFetchLikeCountByMovie {
  movieId: string;
}
