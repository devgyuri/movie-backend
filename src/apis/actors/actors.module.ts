import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { ActorsResolver } from './actors.resolver';
import { ActorsService } from './actors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor, //
    ]),
  ],
  providers: [
    ActorsResolver, //
    ActorsService,
  ],
})
export class ActorsModule {}
