import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import {
  IMoviesServiceCreateMovieAll,
  IMoviesServiceCreateMovieOne,
  IMoviesServiceInsertActorInfo,
  IMoviesServiceOpenMovieInfo,
} from './interfaces/movies-service.interface';
import { ActorsService } from '../actors/actors.service';
import { Actor } from '../actors/entities/actor.entity';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>, //
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
    private readonly genresService: GenresService,
  ) {}

  async insertActorInfo({
    actorNames,
  }: IMoviesServiceInsertActorInfo): Promise<Partial<Actor>[]> {
    // actorNames = ['김수현', '김고은', '이도현'];
    const prevActors = await this.actorsService.findByNames({ actorNames });

    const temp = [];
    actorNames.forEach((el) => {
      const isExists = prevActors.find((prevEl) => el === prevEl.name);
      if (!isExists) {
        temp.push({ name: el });
      }
    });

    const newActors = await this.actorsService.bulkInsert({ names: temp });

    return [...prevActors, ...newActors.identifiers];
  }

  async getOpenMovieInfo(): Promise<string> {
    const info = await axios.get(
      'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp',
      {
        params: {
          collection: 'kmdb_new2',
          ServiceKey: process.env.KMDB_API_KEY,
          releaseDts: '20200101',
          releaseDte: '20241231',
          sort: 'prodYear,1',
        },
      },
    );

    console.log(info.data);
    const totalCnt = 30;
    // const totalCnt = info.data.Data[0].TotalCount;
    // console.log(totalCnt);
    const batch = 10;

    for (let i = 0; i <= totalCnt / batch; i++) {
      const movieArr: IMoviesServiceOpenMovieInfo[] = [];

      const result = await axios.get(
        'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp',
        {
          params: {
            collection: 'kmdb_new2',
            ServiceKey: process.env.KMDB_API_KEY,
            releaseDts: '20190101',
            releaseDte: '20191231',
            // releaseDts: '20200101',
            // releaseDte: '20241231',
            sort: 'prodYear,1',
            listCount: batch,
            startCount: i * batch,
          },
        },
      );
      // console.log('i: ', i);

      const count = result.data.Data[0].Count;
      for (let j = 0; j < count; j++) {
        // console.log('j: ', j);
        const rawData = result.data?.Data[0].Result[j];

        const id = rawData.DOCID;
        const title = rawData.title
          .replaceAll('!HS', '')
          .replaceAll('!HE', '')
          .replace(/ +/g, ' ')
          .trim();
        const dt =
          rawData.repRlsDate.length > 0 ? rawData.repRlsDate : rawData.regDate;
        const open_dt = new Date(
          Number(dt.substr(0, 4)),
          Number(dt.substr(4, 2)) - 1,
          Number(dt.substr(6, 2)),
        );
        const audi_acc = Number(rawData.audiAcc ?? 0);
        const rating = Number(rawData.rating.replace(/[^0-9]/g, ''));
        const plot = rawData.plots.plot[0].plotText;

        const movieInfo: IMoviesServiceOpenMovieInfo = {
          id,
          title,
          open_dt,
          audi_acc,
          rating,
          plot,
        };
        movieArr.push(movieInfo);
      }
      // this.createMovieAll({ data: movieArr });
    }

    // const actor = {
    //   name: '김수현',
    //   movieId: 'K28771',
    // };
    // await this.actorsService.createActor(actor);
    // return 'DB initializing completed!';
    const actorNames = ['김고은', '이도현', '박보영'];
    const actors = await this.insertActorInfo({ actorNames });

    const result2 = await this.moviesRepository.save({
      id: 'AAAA2',
      title: 'hello',
      open_dt: new Date(),
      audi_acc: 100,
      rating: 100,
      plot: 'test text',
      actors,
    });
    console.log(result2);

    return 'DB initializing completed!';
  }

  async createMovieOne({ data }: IMoviesServiceCreateMovieOne): Promise<Movie> {
    const result = await this.moviesRepository.save({
      ...data,
    });
    return result;
  }

  async createMovieAll({ data }: IMoviesServiceCreateMovieAll): Promise<void> {
    await this.moviesRepository.insert(data);
  }
}
