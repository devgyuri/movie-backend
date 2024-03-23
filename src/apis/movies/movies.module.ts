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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor,
      Director,
      Genre,
      Movie, //
    ]),
  ],
  providers: [
    ActorsService,
    DirectorsService,
    GenresService,
    MoviesResolver, //
    MoviesService,
  ],
})
export class MoviesModule {}
