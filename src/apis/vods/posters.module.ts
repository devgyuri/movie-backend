import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vod } from './entities/vod.entity';
import { VodsResolver } from './posters.resolver';
import { VodsService } from './posters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vod, //
    ]),
  ],
  providers: [
    VodsResolver, //
    VodsService,
  ],
})
export class VodsModule {}
