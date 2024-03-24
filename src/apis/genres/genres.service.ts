import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import {
  IGenresServiceBulkInsert,
  IGenresServiceCreateGenre,
  IGenresServiceFindByNames,
} from './interfaces/genrers-service.interface';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  findByNames({ genreNames }: IGenresServiceFindByNames): Promise<Genre[]> {
    return this.genresRepository.find({
      where: { name: In(genreNames) },
    });
  }

  bulkInsert({ names }: IGenresServiceBulkInsert): Promise<any> {
    return this.genresRepository.insert(names);
  }

  createGenre({ name }: IGenresServiceCreateGenre): Promise<Genre> {
    return this.genresRepository.save({
      name,
    });
  }
}
