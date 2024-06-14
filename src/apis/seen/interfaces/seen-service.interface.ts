export interface ISeenServiceFindByUserAndMovie {
  userId: number;
  movieId: string;
}

export interface ISeenServiceSaveSeen {
  userId: number;
  movieId: string;
}

export interface ISeenServiceDeleteSeen {
  userId: number;
  movieId: string;
}

export interface ISeenServiceFetchSeenCountByMovie {
  movieId: string;
}
