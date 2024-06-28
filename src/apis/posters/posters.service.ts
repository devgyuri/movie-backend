import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Poster } from './entities/poster.entity';
import {
  IPostersServiceCreatePoster,
  IPostersServiceCreatePosterAll,
  IPostersServiceFindRepPoster,
} from './interfaces/posters-service.interface';
import { MoviesService } from '../movies/movies.service';
import { dateToString } from 'src/commons/libraries/date';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private readonly postersRepository: Repository<Poster>, //
    @Inject(forwardRef(() => MoviesService))
    private readonly moviesService: MoviesService,
  ) {}

  async findRepPoster({
    movieId,
  }: IPostersServiceFindRepPoster): Promise<Poster> {
    const result = await this.postersRepository.findOne({
      where: {
        movie: {
          id: movieId,
        },
        isRep: true,
      },
    });
    if (result) {
      return result;
    }

    const originalMovie = await this.moviesService.findMovieById({
      id: movieId,
    });
    const openMovieInfo =
      await this.moviesService.fetchOpenMovieInfoByTitleAndRlsDt({
        title: originalMovie.title,
        releaseDate: dateToString(originalMovie.open_dt),
      });
    const posterUrls = openMovieInfo.posters.split('|');
    let repPoster: Poster;
    const posters = await Promise.all(
      posterUrls.map(async (el, index) => {
        if (el) {
          const shortenedUrl = el.replace(
            'http://file.koreafilm.or.kr/thm/',
            '',
          );
          const temp = await this.createPoster({
            url: shortenedUrl,
            movieId: movieId,
            isRep: index === 0 ? true : false,
          });

          if (index === 0) {
            repPoster = temp;
          }
          return temp;
        }
      }),
    );
    await this.moviesService.updateMovie({
      id: movieId,
      posters,
    });
    return repPoster;
  }

  createPoster({
    url,
    movieId,
    isRep,
  }: IPostersServiceCreatePoster): Promise<Poster> {
    return this.postersRepository.save({
      url,
      movie: {
        id: movieId,
      },
      isRep,
    });
  }

  async createPosterAll({
    posterArr,
  }: IPostersServiceCreatePosterAll): Promise<void> {
    await this.postersRepository.insert(posterArr);
  }
}
