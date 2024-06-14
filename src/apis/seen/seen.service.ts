import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seen } from './entities/seen.entity';
import { Repository } from 'typeorm';
import {
  ISeenServiceDeleteSeen,
  ISeenServiceFetchSeenCountByMovie,
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
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.user', 'u')
      .leftJoinAndSelect('s.movie', 'm')
      .where('u.id = :userId', { userId })
      .andWhere('m.id = :movieId', { movieId })
      .getOne();

    return result !== null;
  }

  async createSeen({
    userId,
    movieId,
  }: ISeenServiceSaveSeen): Promise<boolean> {
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

  async deleteSeen({
    userId,
    movieId,
  }: ISeenServiceDeleteSeen): Promise<boolean> {
    const result = await this.seenRepository.delete({
      user: {
        id: userId,
      },
      movie: {
        id: movieId,
      },
    });

    return result !== null;
  }

  async fetchSeenCountByMovie({
    movieId,
  }: ISeenServiceFetchSeenCountByMovie): Promise<number> {
    const result = await this.seenRepository.count({
      where: {
        movie: {
          id: movieId,
        },
      },
    });

    return result;
  }
}
