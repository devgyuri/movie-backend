import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxOffice } from './entities/boxOffice.entity';
import { Movie } from '../movies/entities/movie.entity';
import { BoxOfficeResolver } from './boxOffice.resolver';
import { BoxOfficeService } from './boxOffice.service';
import { MoviesModule } from '../movies/movies.module';
import { BoxOfficeToMovie } from '../boxOfficeToMovie/entities/boxOfficeToMovie.entity';
import { BoxOfficeToMovieService } from '../boxOfficeToMovie/boxOfficeToMovie.service';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forFeature([
      Movie,
      BoxOffice, //
      BoxOfficeToMovie,
    ]),
  ],
  providers: [
    BoxOfficeResolver, //
    BoxOfficeService,
    BoxOfficeToMovieService,
  ],
})
export class BoxOfficeModule {}
