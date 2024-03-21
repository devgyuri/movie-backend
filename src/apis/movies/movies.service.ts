import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { IMoviesServiceCreateMovie } from './interfaces/movies-service.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>, //
  ) {}

  async getOpenMovieInfo(): Promise<Movie> {
    const result = await axios.get(
      'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp',
      {
        params: {
          collection: 'kmdb_new2',
          ServiceKey: process.env.KMDB_API_KEY,
          title: '파묘',
        },
      },
    );
    console.log('=============');
    console.log(result.data);
    console.log('=============');

    const rawData = result.data?.Data[0].Result[0];

    const id = rawData.DOCID;
    const title = rawData.title
      .replaceAll('!HS', '')
      .replaceAll('!HE', '')
      .replace(/ +/g, ' ')
      .trim();
    const open_dt = new Date();
    const audi_acc = 100;
    const avg_star = 4.76;
    const rating = rawData.rating;
    const plot = rawData.plots.plot[0].plotText;

    const movieInfo: Movie = {
      id,
      title,
      open_dt,
      audi_acc,
      avg_star,
      rating,
      plot,
    };

    return this.createMovie({ data: movieInfo });
  }

  async createMovie({ data }: IMoviesServiceCreateMovie): Promise<Movie> {
    const result = await this.moviesRepository.save({
      ...data,
    });
    return result;
  }
}
