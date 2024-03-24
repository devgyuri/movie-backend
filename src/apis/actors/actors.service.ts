import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IActorsServiceFindByNames,
  IActorsServiceBulkInsert,
} from './interfaces/actors-service.interface';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  findByNames({ actorNames }: IActorsServiceFindByNames): Promise<Actor[]> {
    return this.actorsRepository.find({
      where: { name: In(actorNames) },
    });
  }

  bulkInsert({ names }: IActorsServiceBulkInsert): Promise<any> {
    return this.actorsRepository.insert(names);
  }
}
