import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IActorsServiceFindByNames,
  IActorsServiceBulkInsert,
  IActorsServiceCreateActor,
  IActorsServiceUpdateUrl,
  IActorsServiceFindById,
} from './interfaces/actors-service.interface';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  findById({ id }: IActorsServiceFindById): Promise<Actor> {
    return this.actorsRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByNames({ actorNames }: IActorsServiceFindByNames): Promise<Actor[]> {
    return this.actorsRepository.find({
      where: { name: In(actorNames) },
    });
  }

  bulkInsert({ names }: IActorsServiceBulkInsert): Promise<any> {
    return this.actorsRepository.insert(names);
  }

  createActor({ name }: IActorsServiceCreateActor): Promise<Actor> {
    return this.actorsRepository.save({
      name,
    });
  }

  async updateUrl({ id, url }: IActorsServiceUpdateUrl): Promise<Actor> {
    const originalActor = await this.findById({ id });

    return this.actorsRepository.save({
      ...originalActor,
      url,
    });
  }
}
