import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { DirectorsResolver } from './directors.resolver';
import { DirectorsService } from './directors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Director, //
    ]),
  ],
  providers: [
    DirectorsResolver, //
    DirectorsService,
  ],
})
export class DirectorsModule {}
