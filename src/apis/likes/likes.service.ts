import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import {
  ILikesServiceFindByUserAndMovie,
  ILikesServiceSaveLike,
} from './interfaces/likes-service.interface';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private readonly likesRepository: Repository<Like>, //
  ) {}

  async findByUserAndMovie({
    userId,
    movieId,
  }: ILikesServiceFindByUserAndMovie): Promise<boolean> {
    const result = await this.likesRepository
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.user', 'u')
      .leftJoinAndSelect('l.movie', 'm')
      .where('u.id = :userId', { userId })
      .andWhere('m.id = :movieId', { movieId })
      .getOne();

    return result !== null;
  }

  async saveLike({ userId, movieId }: ILikesServiceSaveLike): Promise<boolean> {
    const result = await this.likesRepository.save({
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
