import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vod } from './entities/vod.entity';
import { VodsResolver } from './vods.resolver';
import { VodsService } from './vods.service';

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
