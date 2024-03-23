import { Injectable } from '@nestjs/common';
import { In, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import {
  IGenresServiceBulkInsert,
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

  bulkInsert({ names }: IGenresServiceBulkInsert): Promise<InsertResult> {
    return this.genresRepository.insert(names);
  }
}
