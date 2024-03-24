import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Poster } from './entities/poster.entity';
import {
  IPostersServiceCreatePoster,
  IPostersServiceCreatePosterAll,
} from './interfaces/posters-service.interface';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private readonly postersRepository: Repository<Poster>,
  ) {}

  createPoster({ url, movieId }: IPostersServiceCreatePoster): Promise<Poster> {
    return this.postersRepository.save({
      url,
      movie: {
        id: movieId,
      },
    });
  }

  async createPosterAll({
    posterArr,
  }: IPostersServiceCreatePosterAll): Promise<void> {
    await this.postersRepository.insert(posterArr);
  }
}
