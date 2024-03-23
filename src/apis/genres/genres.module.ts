import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Genre, //
    ]),
  ],
  providers: [
    GenresResolver, //
    GenresService,
  ],
})
export class GenresModule {}
