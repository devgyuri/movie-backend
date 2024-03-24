import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import {
  IMoviesServiceCreateMovieAll,
  IMoviesServiceCreateMovieOne,
  IMoviesServiceInsertActorsInfoArgs,
  IMoviesServiceInsertDirectorsInfoArgs,
  IMoviesServiceInsertGenresInfoArgs,
  IMoviesServiceOpenMovieInfo,
  IMoviesServiceOpenPosterInfo,
  IMoviesServiceOpenVodInfo,
} from './interfaces/movies-service.interface';
import { ActorsService } from '../actors/actors.service';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { PostersService } from '../posters/posters.service';
import { VodsService } from '../vods/vods.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>, //
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
    private readonly genresService: GenresService,
    private readonly postersService: PostersService,
    private readonly vodsService: VodsService,
  ) {}

  async insertActorsInfo({ actorNames }: IMoviesServiceInsertActorsInfoArgs) {
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

  async insertDirectorsInfo({
    directorNames,
  }: IMoviesServiceInsertDirectorsInfoArgs) {
    // directorNames = ['봉준호', '김철수'];
    const prevDirectors = await this.directorsService.findByNames({
      directorNames,
    });

    const temp = [];
    directorNames.forEach((el) => {
      const isExists = prevDirectors.find((prevEl) => el === prevEl.name);
      if (!isExists) {
        temp.push({ name: el });
      }
    });

    const newDirectors = await this.directorsService.bulkInsert({
      names: temp,
    });

    return [...prevDirectors, ...newDirectors.identifiers];
  }

  async insertGenresInfo({ genreNames }: IMoviesServiceInsertGenresInfoArgs) {
    // genreNames = ['SF', '스릴라'];
    const prevGenres = await this.genresService.findByNames({
      genreNames,
    });

    const temp = [];
    genreNames.forEach((el) => {
      const isExists = prevGenres.find((prevEl) => el === prevEl.name);
      if (!isExists) {
        temp.push({ name: el });
      }
    });

    const newGenres = await this.genresService.bulkInsert({
      names: temp,
    });

    return [...prevGenres, ...newGenres.identifiers];
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
      const posterArr: IMoviesServiceOpenPosterInfo[] = [];
      const vodArr: IMoviesServiceOpenVodInfo[] = [];

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

        // 1:N relationship -> FK 제약 조건
        const posterUrls = rawData.posters.split('|');
        posterUrls.map((el) => {
          posterArr.push({
            url: el ?? 'no poster',
            movie: new Movie(id),
          });
        });
        const vodUrls = rawData.vods.vod.map((el) => {
          return el.vodUrl;
        });
        vodArr.push(
          vodUrls.map((el) => {
            return {
              url: el ?? 'no vod',
              movieId: id,
            };
          }),
        );
        // vodUrls.map(async (el) => {
        //   await this.vodsService.createVod({
        //     url: el,
        //     movieId: id,
        //   });
        // });

        // N:M relationship
        const actorNames = rawData.actors.actor.map((el) => {
          return el.actorNm;
        });
        const actors = await this.insertActorsInfo({ actorNames });
        const directorNames = rawData.directors.director.map((el) => {
          return el.directorNm;
        });
        const directors = await this.insertDirectorsInfo({ directorNames });
        const genreNames = rawData.genre.split(',');
        const genres = await this.insertGenresInfo({ genreNames });

        const movieInfo: IMoviesServiceOpenMovieInfo = {
          id,
          title,
          open_dt,
          audi_acc,
          rating,
          plot,
          actors,
          directors,
          genres,
        };
        movieArr.push(movieInfo);
      }
      await this.createMovieAll({ movieArr });
      await this.postersService.createPosterAll({ posterArr });
      await this.vodsService.createVodAll({ vodArr });
    }

    // const actor = {
    //   name: '김수현',
    //   movieId: 'K28771',
    // };
    // await this.actorsService.createActor(actor);
    // return 'DB initializing completed!';

    // const actorNames = ['김고은', '이도현', '박보영'];
    // const actors = await this.insertActorsInfo({ actorNames });

    // const result2 = await this.moviesRepository.save({
    //   id: 'AAAA2',
    //   title: 'hello',
    //   open_dt: new Date(),
    //   audi_acc: 100,
    //   rating: 100,
    //   plot: 'test text',
    //   actors,
    // });
    // console.log(result2);

    return 'DB initializing completed!';
  }

  async createMovieOne({ data }: IMoviesServiceCreateMovieOne): Promise<Movie> {
    const result = await this.moviesRepository.save({
      ...data,
    });
    return result;
  }

  async createMovieAll({
    movieArr,
  }: IMoviesServiceCreateMovieAll): Promise<void> {
    await this.moviesRepository.insert(movieArr);
  }
}
