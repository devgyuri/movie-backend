import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seen } from './entities/seen.entity';
import { Repository } from 'typeorm';
import {
  ISeenServiceFindByUserAndMovie,
  ISeenServiceSaveSeen,
} from './interfaces/seen-service.interface';

@Injectable()
export class SeenService {
  constructor(
    @InjectRepository(Seen) private readonly seenRepository: Repository<Seen>, //
  ) {}

  async findByUserAndMovie({
    userId,
    movieId,
  }: ISeenServiceFindByUserAndMovie): Promise<boolean> {
    const result = await this.seenRepository
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.user', 'u')
      .leftJoinAndSelect('l.movie', 'm')
      .where('u.id = :userId', { userId })
      .andWhere('m.id = :movieId', { movieId })
      .getOne();

    return result !== null;
  }

  async saveLike({ userId, movieId }: ISeenServiceSaveSeen): Promise<boolean> {
    const result = await this.seenRepository.save({
      user: {
        id: userId,
      },
      movie: {
        id: movieId,
      },
    });

    return result !== null;
  }
}
