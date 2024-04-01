import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoxOfficeToMovie } from './entities/boxOfficeToMovie.entity';
import { IBoxOfficeToMovieServiceCreateBoxOfficeToMovie } from './interfaces/boxOfficeToMovie.service.interface';

@Injectable()
export class BoxOfficeToMovieService {
  constructor(
    @InjectRepository(BoxOfficeToMovie)
    private readonly boxOfficeToMovieRepository: Repository<BoxOfficeToMovie>,
  ) {}

  async createBoxOfficeToMovie({
    boxOffice,
    movie,
    rank,
  }: IBoxOfficeToMovieServiceCreateBoxOfficeToMovie): Promise<BoxOfficeToMovie> {
    const boxOfficeToMovieInfo = new BoxOfficeToMovie();
    boxOfficeToMovieInfo.boxOffice = boxOffice;
    boxOfficeToMovieInfo.movie = movie;
    boxOfficeToMovieInfo.rank = rank;
    return this.boxOfficeToMovieRepository.save(boxOfficeToMovieInfo);
  }
}
