import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie, //
    ]),
  ],
  providers: [
    MoviesResolver, //
    MoviesService,
  ],
})
export class MoviesModule {}
