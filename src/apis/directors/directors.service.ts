import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import {
  IDirectorsServiceBulkInsert,
  IDirectorsServiceFindByNames,
} from './interfaces/directors-service.interface';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
  ) {}

  findByNames({
    directorNames,
  }: IDirectorsServiceFindByNames): Promise<Director[]> {
    return this.directorsRepository.find({
      where: { name: In(directorNames) },
    });
  }

  bulkInsert({ names }: IDirectorsServiceBulkInsert): Promise<any> {
    return this.directorsRepository.insert(names);
  }
}
