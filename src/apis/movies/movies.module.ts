import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ActorsService } from '../actors/actors.service';
import { Actor } from '../actors/entities/actor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor,
      Movie, //
    ]),
  ],
  providers: [
    ActorsService,
    MoviesResolver, //
    MoviesService,
  ],
})
export class MoviesModule {}
