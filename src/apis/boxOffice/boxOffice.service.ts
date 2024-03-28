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

  async findByDate({
    dateString,
  }: IBoxOfficeServiceFindByDate): Promise<BoxOffice> {
    const result = await this.boxOfficeRepository.findOne({
      where: { date: stringToDate(dateString) },
      relations: { boxOfficeToMovies: true },
    });

    console.log(result);
    return result;

    // if (result) {
    //   return result;
    // }
    // return this.createBoxOffice({ dateString });
  }

  async getBoxOfficeMovies({
    dateString,
  }: IBoxOfficeServiceGetBoxOfficeMovies): Promise<string> {
    const boxOfficeResult = await this.findByDate({ dateString });
    return 'getBoxOfficeMovies';
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
