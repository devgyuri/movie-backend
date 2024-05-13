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
  IActorsSErviceFetchImage,
  IActorsServiceFindByName,
} from './interfaces/actors-service.interface';
import axios from 'axios';

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

  findByName({ name }: IActorsServiceFindByName): Promise<Actor> {
    return this.actorsRepository.findOne({
      where: {
        name,
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

  async fetchImage({ name }: IActorsSErviceFetchImage): Promise<string> {
    const actor = await this.findByName({ name });

    if (actor.url === '') {
      const result = await axios.get(
        'https://api.themoviedb.org/3/search/person?',
        {
          params: {
            query: name,
            include_adult: false,
            language: 'ko-KR',
            page: 1,
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        },
      );

      const imageUrl = result.data.results[0].profile_path;

      this.actorsRepository.save({
        ...actor,
        url: imageUrl,
      });

      return imageUrl;
    }

    return actor.url;
  }
}
