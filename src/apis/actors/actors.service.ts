import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IActorsServiceCreateActor } from './interfaces/actord-service.interface';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  createActor({ name, movieId }: IActorsServiceCreateActor): Promise<Actor> {
    return this.actorsRepository.save({
      name,
      movie: {
        id: movieId,
      },
    });
  }
}
