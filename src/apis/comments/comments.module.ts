import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forFeature([
      Comment, //
      Movie,
    ]),
  ],
  providers: [
    CommentsResolver, //
    CommentsService,
  ],
})
export class CommentsModule {}
