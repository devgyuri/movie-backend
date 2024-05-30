import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import {
  ILikesServiceDeleteLike,
  ILikesServiceFetchLikeCountByMovie,
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

  async createLike({
    userId,
    movieId,
  }: ILikesServiceSaveLike): Promise<boolean> {
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

  async deleteLike({
    userId,
    movieId,
  }: ILikesServiceDeleteLike): Promise<boolean> {
    const result = await this.likesRepository.delete({
      user: {
        id: userId,
      },
      movie: {
        id: movieId,
      },
    });

    return result !== null;
  }

  async fetchLikeCountByMovie({
    movieId,
  }: ILikesServiceFetchLikeCountByMovie): Promise<number> {
    const result = await this.likesRepository.count({
      where: {
        movie: {
          id: movieId,
        },
      },
    });

    return result;
  }
}
