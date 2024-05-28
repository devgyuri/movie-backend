import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seen } from './entities/seen.entity';
import { SeenResolver } from './seen.resolver';
import { SeenService } from './seen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Seen, //
    ]),
  ],
  providers: [
    SeenResolver, //
    SeenService,
  ],
})
export class SeenModule {}
