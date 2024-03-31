import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoxOffice } from './entities/boxOffice.entity';
import { Movie } from '../movies/entities/movie.entity';
import {
  IBoxOfficeServiceCreateBoxOffice,
  IBoxOfficeServiceFindByDate,
  IBoxOfficeServiceGetBoxOfficeMovies,
} from './interfaces/boxOffice-service.interface';
import { stringToDate } from 'src/commons/libraries/date';
import { MoviesService } from '../movies/movies.service';
import axios from 'axios';
import { IBoxOfficeList } from 'src/commons/types/bosOffice.types';

@Injectable()
export class BoxOfficeService {
  constructor(
    @InjectRepository(BoxOffice)
    private readonly boxOfficeRepository: Repository<BoxOffice>,
    private readonly moviesService: MoviesService,
  ) {}

  async findByDate({ dateString }: IBoxOfficeServiceFindByDate): Promise<any> {
    // const result = await this.boxOfficeRepository.findOne({
    //   where: { date: stringToDate(dateString) },
    //   relations: { boxOfficeToMovies: true },
    // });

    const result2 = await this.boxOfficeRepository
      .createQueryBuilder('boxOffice')
      .leftJoinAndSelect('boxOffice.boxOfficeToMovies', 'boxOfficeToMovie')
      .leftJoinAndSelect('boxOfficeToMovie.movie', 'movie')
      .where('boxOffice.date = :date', { date: stringToDate(dateString) })
      .getMany();

    // console.log(result);
    return result2;

    // if (result) {
    //   return result;
    // }
    // return this.createBoxOffice({ dateString });
  }

  async getBoxOfficeMovies({
    dateString,
  }: IBoxOfficeServiceGetBoxOfficeMovies): Promise<Movie[]> {
    const boxOfficeResult = await this.findByDate({ dateString });
    console.log(boxOfficeResult);
    console.log(boxOfficeResult[0].boxOfficeToMovies[0]);

    const movies = boxOfficeResult[0].boxOfficeToMovies.map((el) => {
      return el.movie;
    });

    return movies;
    // return Promise.all(
    //   boxOfficeResult.movies.map((el) => {
    //     return this.moviesService.findMovieById({ id: el.id });
    //   }),
    // );
  }

  async createBoxOffice({
    dateString,
  }: IBoxOfficeServiceCreateBoxOffice): Promise<BoxOffice> {
    const result = await axios.get(
      'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',
      {
        params: {
          key: process.env.KOBIS_API_KEY,
          targetDt: dateString,
        },
      },
    );

    const boxOfficeList: IBoxOfficeList[] =
      result.data?.boxOfficeResult.dailyBoxOfficeList;

    // openDt: yyyy-mm-dd
    const movies = await Promise.all(
      boxOfficeList.map((el) => {
        return this.moviesService.findMovieByTitleAndRlsDt({
          title: el.movieNm,
          releaseDate: el.openDt.replaceAll('-', ''),
        });
      }),
    );
    console.log(movies);

    const boxOfficeInfo = new BoxOffice();
    boxOfficeInfo.date = stringToDate(dateString);
    // boxOfficeInfo.movies = movies;
    // return boxOfficeInfo;
    return this.boxOfficeRepository.save(boxOfficeInfo);
  }
}
