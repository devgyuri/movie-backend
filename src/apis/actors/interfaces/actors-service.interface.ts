export interface IActorsServiceFindById {
  id: number;
}

export interface IActorsServiceFindByName {
  name: string;
}

export interface IActorsServiceFindByNames {
  actorNames: string[];
}

export interface IActorsServiceBulkInsert {
  names: {
    name: string;
  }[];
}

export interface IActorsServiceCreateActor {
  name: string;
}

export interface IActorsServiceUpdateUrl {
  id: number;
  url: string;
}

export interface IActorsSErviceFetchImage {
  name: string;
}
