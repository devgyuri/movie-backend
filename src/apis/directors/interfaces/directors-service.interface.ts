export interface IDirectorsServiceFindByNames {
  directorNames: string[];
}

export interface IDirectorsServiceBulkInsert {
  names: {
    name: string;
  }[];
}

export interface IDirectorsServiceCreateDirector {
  name: string;
}
