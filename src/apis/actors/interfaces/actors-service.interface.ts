export interface IActorsServiceFindByNames {
  actorNames: string[];
}

export interface IActorsServiceBulkInsert {
  names: {
    name: string;
  }[];
}
