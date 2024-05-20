import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Still } from './entities/stills.entity';
import { IStillsServiceCreateStill } from './interfaces/stills-service.interface';

@Injectable()
export class StillsService {
  constructor(
    @InjectRepository(Still)
    private readonly stillsRepository: Repository<Still>,
  ) {}

  createStill({
    url,
    movieId,
    isRep,
  }: IStillsServiceCreateStill): Promise<Still> {
    return this.stillsRepository.save({
      url,
      movie: {
        id: movieId,
      },
      isRep,
    });
  }
}
