import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vod } from './entities/vod.entity';
import { IVodsServiceCreateVod } from './interfaces/vods-service.interface';

@Injectable()
export class VodsService {
  constructor(
    @InjectRepository(Vod)
    private readonly postersRepository: Repository<Vod>,
  ) {}

  createPoster({ url, movieId }: IVodsServiceCreateVod): Promise<Vod> {
    return this.postersRepository.save({
      url,
      movie: {
        id: movieId,
      },
    });
  }
}
