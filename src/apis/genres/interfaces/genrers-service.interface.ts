export interface IGenresServiceFindByNames {
  genreNames: string[];
}

export interface IGenresServiceBulkInsert {
  names: {
    name: string;
  }[];
}
