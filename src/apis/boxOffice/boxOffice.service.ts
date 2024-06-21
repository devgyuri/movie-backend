import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoxOffice } from './entities/boxOffice.entity';
import {
  IBoxOfficeServiceCreateBoxOffice,
  IBoxOfficeServiceFindByDate,
  IBoxOfficeServiceGetBoxOfficeMovies,
} from './interfaces/boxOffice-service.interface';
import { stringToDate } from 'src/commons/libraries/date';
import { MoviesService } from '../movies/movies.service';
import axios from 'axios';
import { IBoxOfficeList } from 'src/commons/types/bosOffice.types';
import { BoxOfficeToMovieService } from '../boxOfficeToMovie/boxOfficeToMovie.service';
import { BoxOfficeToMovie } from '../boxOfficeToMovie/entities/boxOfficeToMovie.entity';

@Injectable()
export class BoxOfficeService {
  constructor(
    @InjectRepository(BoxOffice)
    private readonly boxOfficeRepository: Repository<BoxOffice>,
    private readonly moviesService: MoviesService,
    private readonly boxOfficeToMovieService: BoxOfficeToMovieService,
  ) {}

  async findByDate({
    dateString,
  }: IBoxOfficeServiceFindByDate): Promise<BoxOffice> {
    const result = await this.boxOfficeRepository.findOne({
      where: { date: stringToDate(dateString) },
      relations: { boxOfficeToMovies: true },
    });

    return result;
  }

  async getBoxOfficeMovies({
    dateString,
  }: IBoxOfficeServiceGetBoxOfficeMovies): Promise<BoxOfficeToMovie[]> {
    let boxOfficeResult = await this.findByDate({ dateString });
    console.log(boxOfficeResult);

    if (!boxOfficeResult) {
      await this.createBoxOffice({ dateString });
      boxOfficeResult = await this.findByDate({ dateString });
    }

    console.log('here===========');

    const sortedList = boxOfficeResult.boxOfficeToMovies.sort(
      (a, b) => a.rank - b.rank,
    );
    // const moviesResult = sortedList.map((el) => {
    //   return el.movie;
    // });

    return sortedList;
  }

  async createBoxOffice({
    dateString,
  }: IBoxOfficeServiceCreateBoxOffice): Promise<void> {
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

    // const boxOffice = new BoxOffice();
    // boxOffice.date = stringToDate(dateString);
    const boxOffice = await this.boxOfficeRepository.save({
      date: stringToDate(dateString),
    });

    // openDt: yyyy-mm-dd
    // for (let i = 0; i < boxOfficeList.length; i++) {
    //   const movie = await this.moviesService.findMovieByTitleAndRlsDt({
    //     title: boxOfficeList[i].movieNm,
    //     releaseDate: boxOfficeList[i].openDt.replaceAll('-', ''),
    //   });
    //   console.log(movie);

    //   await this.boxOfficeToMovieService.createBoxOfficeToMovie({
    //     boxOffice,
    //     movie,
    //     rank: i + 1,
    //   });
    // }
    await Promise.all(
      boxOfficeList.map(async (el, index) => {
        const movie = await this.moviesService.findMovieByTitleAndRlsDt({
          title: el.movieNm,
          releaseDate: el.openDt.replaceAll('-', ''),
        });
        // console.log(movie);
        console.log(el);

        await this.boxOfficeToMovieService.createBoxOfficeToMovie({
          boxOffice,
          movie,
          rank: index + 1,
          audi_acc: Number(el.audiAcc),
        });
      }),
    );
  }
}
