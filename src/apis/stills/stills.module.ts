import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Still } from './entities/stills.entity';
import { StillsResolver } from './stills.resolver';
import { StillsService } from './stills.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Still, //
    ]),
  ],
  providers: [
    StillsResolver, //
    StillsService,
  ],
})
export class StillsModule {}
