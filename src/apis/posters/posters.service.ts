import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Poster } from './entities/poster.entity';
import { IPostersServiceCreatePoster } from './interfaces/posters-service.interface';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private readonly vodsRepository: Repository<Poster>,
  ) {}

  createPoster({ url, movieId }: IPostersServiceCreatePoster): Promise<Poster> {
    return this.vodsRepository.save({
      url,
      movie: {
        id: movieId,
      },
    });
  }
}
