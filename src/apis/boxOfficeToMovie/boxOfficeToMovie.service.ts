import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoxOfficeToMovie } from './entities/boxOfficeToMovie.entity';
import { IBoxOfficeToMovieServiceCreateBoxOfficeToMovie } from './interfaces/boxOfficeToMovie-service.interface';

@Injectable()
export class BoxOfficeToMovieService {
  constructor(
    @InjectRepository(BoxOfficeToMovie)
    private readonly boxOfficeToMovieRepository: Repository<BoxOfficeToMovie>,
  ) {}

  async createBoxOfficeToMovie(
    boxOfficeInfo: IBoxOfficeToMovieServiceCreateBoxOfficeToMovie,
  ): Promise<BoxOfficeToMovie> {
    return this.boxOfficeToMovieRepository.save({
      ...boxOfficeInfo,
    });
  }
}
