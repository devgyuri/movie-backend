import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxOfficeToMovie } from './entities/boxOfficeToMovie.entity';
import { BoxOfficeToMovieResolver } from './boxOfficeToMovie.resolver';
import { BoxOfficeToMovieService } from './boxOfficeToMovie.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoxOfficeToMovie, //
    ]),
  ],
  providers: [
    BoxOfficeToMovieResolver, //
    BoxOfficeToMovieService,
  ],
})
export class BoxOfficeToMovieModule {}
