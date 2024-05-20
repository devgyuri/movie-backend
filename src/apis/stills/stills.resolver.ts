import { Query, Resolver } from '@nestjs/graphql';
import { StillsService } from './stills.service';

@Resolver()
export class StillsResolver {
  constructor(
    private readonly stillsService: StillsService, //
  ) {}

  @Query(() => String)
  fetchStill(): string {
    return 'dummy fetch still';
  }
}
