import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ActorsService } from '../actors/actors.service';
import { Actor } from '../actors/entities/actor.entity';
import { DirectorsService } from '../directors/directors.service';
import { GenresService } from '../genres/genres.service';
import { Director } from '../directors/entities/director.entity';
import { Genre } from '../genres/entities/genre.entity';
import { PostersService } from '../posters/posters.service';
import { VodsService } from '../vods/vods.service';
import { Poster } from '../posters/entities/poster.entity';
import { Vod } from '../vods/entities/vod.entity';
import { StillsService } from '../stills/stills.service';
import { Still } from '../stills/entities/stills.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor,
      Director,
      Genre,
      Poster,
      Still,
      Vod,
      Movie, //
    ]),
  ],
  providers: [
    ActorsService,
    DirectorsService,
    GenresService,
    PostersService,
    StillsService,
    VodsService,
    MoviesResolver, //
    MoviesService,
  ],
  exports: [
    MoviesService, //
  ],
})
export class MoviesModule {}
