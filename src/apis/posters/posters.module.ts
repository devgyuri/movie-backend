import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from './entities/poster.entity';
import { PostersResolver } from './posters.resolver';
import { PostersService } from './posters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Poster, //
    ]),
  ],
  providers: [
    PostersResolver, //
    PostersService,
  ],
})
export class PostersModule {}
