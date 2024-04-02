import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vod } from './entities/vod.entity';
import {
  IVodsServiceCreateVod,
  IVodsServiceCreateVodAll,
} from './interfaces/vods-service.interface';

@Injectable()
export class VodsService {
  constructor(
    @InjectRepository(Vod)
    private readonly vodsRepository: Repository<Vod>,
  ) {}

  createVod({ url, movieId, isRep }: IVodsServiceCreateVod): Promise<Vod> {
    return this.vodsRepository.save({
      url,
      movie: {
        id: movieId,
      },
      isRep,
    });
  }

  async createVodAll({ vodArr }: IVodsServiceCreateVodAll): Promise<void> {
    await this.vodsRepository.insert(vodArr);
  }

  // createVod({ vod }: IVodsServiceCreateVod): Promise<Vod> {
  //   return this.vodsRepository.save({
  //     ...vod,
  //   });
  // }
}
