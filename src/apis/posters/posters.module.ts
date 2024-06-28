import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from './entities/poster.entity';
import { PostersResolver } from './posters.resolver';
import { PostersService } from './posters.service';
import { Movie } from '../movies/entities/movie.entity';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    forwardRef(() => MoviesModule), //
    TypeOrmModule.forFeature([
      Poster, //
      Movie,
    ]),
  ],
  providers: [
    PostersResolver, //
    PostersService,
  ],
})
export class PostersModule {}
