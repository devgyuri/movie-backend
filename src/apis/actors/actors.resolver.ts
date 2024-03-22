import { Query, Resolver } from '@nestjs/graphql';
import { ActorsService } from './actors.service';

@Resolver()
export class ActorsResolver {
  constructor(
    private readonly actorsService: ActorsService, //
  ) {}

  @Query(() => String)
  fetchActor(): string {
    return 'dummy fetch actor';
  }
}
