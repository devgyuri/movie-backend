export interface ISeenServiceFindByUserAndMovie {
  userId: number;
  movieId: string;
}

export interface ISeenServiceSaveSeen {
  userId: number;
  movieId: string;
}
