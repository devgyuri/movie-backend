import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import {
  IMoviesServiceCreateMovieAll,
  IMoviesServiceCreateMovie,
  IMoviesServiceInsertActorsInfoArgs,
  IMoviesServiceInsertDirectorsInfoArgs,
  IMoviesServiceInsertGenresInfoArgs,
  IMoviesServiceOpenMovieInfo,
  IMoviesServiceCreateOpenMovieInfo,
  IMoviesServiceCreateMovieByTitleAndRlsDt,
  IMoviesServiceFindMovieByTitleAndRlsDt,
  IMoviesServiceFindMovieById,
  IMoviesServiceGetTmdbImageUrl,
  IMoviesServiceUpdateMovie,
} from './interfaces/movies-service.interface';
import { ActorsService } from '../actors/actors.service';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { PostersService } from '../posters/posters.service';
import { VodsService } from '../vods/vods.service';
import { Actor } from '../actors/entities/actor.entity';
import { Director } from '../directors/entities/director.entity';
import { Genre } from '../genres/entities/genre.entity';
import { IMovie } from 'src/commons/types/movieDetail.types';
import { stringToDate } from 'src/commons/libraries/date';
import { StillsService } from '../stills/stills.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>, //
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
    private readonly genresService: GenresService,
    private readonly postersService: PostersService,
    private readonly stillsService: StillsService,
    private readonly vodsService: VodsService,
  ) {}

  async getTmdbImageUrl({
    actorName,
  }: IMoviesServiceGetTmdbImageUrl): Promise<string> {
    const result = await axios.get(
      'https://api.themoviedb.org/3/search/person?',
      {
        params: {
          query: actorName,
          include_adult: true,
          language: 'ko-KR',
          page: 1,
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );

    let mostPopularIndex = 0;
    let maxPopularity = 0;
    result?.data.results.forEach((el, index) => {
      if (
        el.known_for_department === 'Acting' &&
        el.popularity > maxPopularity
      ) {
        maxPopularity = el.popularity;
        mostPopularIndex = index;
      }
    });
    return result?.data.results[mostPopularIndex]?.profile_path ?? '';
  }

  async insertActorsInfo({
    actorNames,
  }: IMoviesServiceInsertActorsInfoArgs): Promise<Actor[]> {
    // actorNames = ['김수현', '김고은', '이도현'];
    const prevActors = await this.actorsService.findByNames({ actorNames });

    const missingActorNames: string[] = [];
    actorNames.forEach((el) => {
      const isExists = prevActors.find((prevEl) => el === prevEl.name);
      if (!isExists) {
        missingActorNames.push(el);
      }
    });

    const newActors = await Promise.all(
      missingActorNames.map(async (el) => {
        // const url = await this.getTmdbImageUrl({ actorName: el });
        return this.actorsService.createActor({ name: el });
      }),
    );

    return [...prevActors, ...newActors];
  }

  async insertDirectorsInfo({
    directorNames,
  }: IMoviesServiceInsertDirectorsInfoArgs): Promise<Director[]> {
    // directorNames = ['봉준호', '김철수'];
    const prevDirectors = await this.directorsService.findByNames({
      directorNames,
    });

    const missingDirectorNames: string[] = [];
    directorNames.forEach((el) => {
      const isExists = prevDirectors.find((prevEl) => el === prevEl.name);
      if (!isExists) {
        missingDirectorNames.push(el);
      }
    });

    const newDirectors = await Promise.all(
      missingDirectorNames.map((el) => {
        return this.directorsService.createDirector({ name: el });
      }),
    );

    return [...prevDirectors, ...newDirectors];
  }

  async insertGenresInfo({
    genreNames,
  }: IMoviesServiceInsertGenresInfoArgs): Promise<Genre[]> {
    // genreNames = ['SF', '스릴라'];
    const prevGenres = await this.genresService.findByNames({
      genreNames,
    });

    const missingGenreNames: string[] = [];
    genreNames.forEach((el) => {
      const isExists = prevGenres.find((prevEl) => el === prevEl.name);
      if (!isExists) {
        missingGenreNames.push(el);
      }
    });

    const newGenres = await Promise.all(
      missingGenreNames.map((el) => {
        return this.genresService.createGenre({ name: el });
      }),
    );

    return [...prevGenres, ...newGenres];
  }

  // 해당 영화를 조회할 때 배우 이미지가 존재하지 않으면 open api로 요청해서 받아오기
  async findMovieById({ id }: IMoviesServiceFindMovieById): Promise<Movie> {
    const result = await this.moviesRepository.findOne({
      where: { id },
      relations: {
        actors: true,
      },
    });

    const prevActors = result.actors;
    // const newActors = await Promise.all(
    //   prevActors.map((el: Actor) => {
    //     if (el.url === '') {
    //       return {
    //         ...el,
    //         url: this.getTmdbImageUrl({ actorName: el.name }),
    //       };
    //     } else {
    //       return el;
    //     }
    //   }),
    // );
    const newActors: Actor[] = [];
    for (let i = 0; i < prevActors.length; i++) {
      if (prevActors[i].url === '') {
        const imageUrl = await this.getTmdbImageUrl({
          actorName: prevActors[i].name,
        });
        const updatedActor = await this.actorsService.updateUrl({
          id: prevActors[i].id,
          url: imageUrl,
        });
        newActors.push(updatedActor);
      } else {
        newActors.push(prevActors[i]);
      }
    }

    console.log('========actor url test=========');
    console.log(newActors);

    return this.moviesRepository.findOne({
      where: { id },
      relations: {
        actors: true,
        directors: true,
        genres: true,
      },
    });
  }

  async findMovieByTitleAndRlsDt({
    title,
    releaseDate,
  }: IMoviesServiceFindMovieByTitleAndRlsDt): Promise<Movie> {
    console.log('movie - findByTitle');
    console.log('releaseDate: ', releaseDate);

    const result = await this.moviesRepository.findOne({
      where: { title, open_dt: stringToDate(releaseDate) },
      relations: {
        actors: true,
        directors: true,
        genres: true,
      },
    });

    if (result) {
      return result;
    }

    const temp = new Movie();
    temp.title = title;
    temp.open_dt = stringToDate(releaseDate);
    // return temp;
    return this.createMovieByTitleAndRlsDt({ title, releaseDate });
  }

  async createMovieByTitleAndRlsDt({
    title,
    releaseDate,
  }: IMoviesServiceCreateMovieByTitleAndRlsDt): Promise<Movie> {
    const result = await axios.get(
      'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp',
      {
        params: {
          collection: 'kmdb_new2',
          ServiceKey: process.env.KMDB_API_KEY,
          title: title,
          releaseDts: releaseDate,
          releaseDte: releaseDate,
        },
      },
    );

    console.log('========');
    console.log('title: ', title, ' releaseDate: ', releaseDate);
    console.log(result.data);
    console.log('========');

    return this.createOpenMovieInfo({
      rawData: result.data?.Data[0].Result[0],
    });
  }

  async createOpenMovieInfo({
    rawData,
  }: IMoviesServiceCreateOpenMovieInfo): Promise<Movie> {
    const id = rawData.DOCID;
    const title = rawData.title
      .replaceAll('!HS', '')
      .replaceAll('!HE', '')
      .replace(/ +/g, ' ')
      .trim();
    const dt =
      rawData.repRlsDate.length > 0 ? rawData.repRlsDate : rawData.regDate;
    const open_dt = stringToDate(dt);
    const audi_acc = Number(rawData.audiAcc ?? 0);
    const rating = Number(rawData.rating.replace(/[^0-9]/g, ''));
    const plot = rawData.plots.plot[0].plotText;
    const runtime = Number(rawData.runtime);

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

    // movie table
    const movieInfo: IMoviesServiceOpenMovieInfo = {
      id,
      title,
      open_dt,
      audi_acc,
      rating,
      plot,
      runtime,
      actors,
      directors,
      genres,
    };
    await this.createMovie({ data: movieInfo });

    // 1:N relationship
    const posterUrls = rawData.posters.split('|');
    await Promise.all(
      posterUrls.map((el, index) => {
        if (el) {
          // const shortenedUrl = el.replace(
          //   'http://file.koreafilm.or.kr/thm/',
          //   '',
          // );
          return this.postersService.createPoster({
            url: el,
            movieId: id,
            isRep: index === 0 ? true : false,
          });
        }
      }),
    );
    const stillUrls = rawData.stlls.split('|');
    await Promise.all(
      stillUrls.map((el, index) => {
        if (el) {
          // const shortenedUrl = el.replace(
          //   'http://file.koreafilm.or.kr/thm/',
          //   '',
          // );
          return this.stillsService.createStill({
            url: el,
            movieId: id,
            isRep: index === 0 ? true : false,
          });
        }
      }),
    );
    let repVodIdx = 0;
    const vodUrls = rawData.vods.vod.map((el, idx) => {
      if (el.vodClass.includes('메인예고') || el.vodClass.includes('1차예고')) {
        repVodIdx = idx;
      }
      return el.vodUrl;
    });
    await Promise.all(
      vodUrls.map((el, index) => {
        if (el) {
          return this.vodsService.createVod({
            url: el,
            movieId: id,
            isRep: index === repVodIdx ? true : false,
          });
        }
      }),
    );

    return this.findMovieById({ id });
  }

  async createOpenMovieInfoAll(): Promise<string> {
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
    // const totalCnt = 5;
    const totalCnt = info.data.Data[0].TotalCount;
    const batch = 5;

    for (let i = 0; i <= totalCnt / batch; i++) {
      const result = await axios.get(
        'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp',
        {
          params: {
            collection: 'kmdb_new2',
            ServiceKey: process.env.KMDB_API_KEY,
            // releaseDts: '20190101',
            // releaseDte: '20191231',
            releaseDts: '20200101',
            releaseDte: '20241231',
            sort: 'prodYear,1',
            listCount: batch,
            startCount: i * batch,
          },
        },
      );
      // console.log('i: ', i);

      const count = result.data.Data[0].Count;
      // const count = 5;
      for (let j = 0; j < count; j++) {
        // console.log('j: ', j);
        const rawData: IMovie = result.data?.Data[0].Result[j];

        await this.createOpenMovieInfo({ rawData });
      }
    }

    return 'DB initializing completed!';
  }

  // except posters and vods
  createMovie({ data }: IMoviesServiceCreateMovie): Promise<Movie> {
    return this.moviesRepository.save({
      ...data,
    });
  }

  async createMovieAll({
    movieArr,
  }: IMoviesServiceCreateMovieAll): Promise<void> {
    await this.moviesRepository.insert(movieArr);
  }

  async updateMovie(updateInput: IMoviesServiceUpdateMovie): Promise<Movie> {
    const result = await this.moviesRepository.save({
      ...updateInput,
    });
    return result;
  }
}
