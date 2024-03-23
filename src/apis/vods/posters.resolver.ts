import { Query, Resolver } from '@nestjs/graphql';
import { VodsService } from './posters.service';

@Resolver()
export class VodsResolver {
  constructor(
    private readonly vodsService: VodsService, //
  ) {}

  @Query(() => String)
  fetchVod(): string {
    return 'dummy fetch vod';
  }
}
